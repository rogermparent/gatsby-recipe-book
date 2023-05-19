import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import path from "path";
import fs from "fs/promises";
import setValue from "lodash/set";
import { getContentDirectory } from "core/getContentDirectory.mjs";

const contentDirectory = getContentDirectory();
const recipesDirectory = path.resolve(contentDirectory, "recipes");
const uploadsDirectory = path.resolve(contentDirectory, "uploads");

interface GatsbyFunctionRequestWithFiles extends GatsbyFunctionRequest {
  files?: FileEntry[];
}

interface Handler {
  (
    req: GatsbyFunctionRequestWithFiles,
    res: GatsbyFunctionResponse
  ): Promise<void>;
}

interface ReconstitutedFormValues {
  [key: string]: string | number | ReconstitutedFormValues;
}

const fieldHandlers: Record<
  string,
  (input: string) => string | number | boolean
> = {
  servings: Number,
  prepTime: Number,
  cookTime: Number,
  totalTime: Number,
  copy: Boolean,
};

const handleField = (
  acc: ReconstitutedFormValues,
  key: string,
  value: string
) =>
  value &&
  setValue(acc, key, fieldHandlers[key] ? fieldHandlers[key](value) : value);

interface FileEntry {
  originalname: string;
  fieldname: string;
  buffer: Buffer;
}

const processFormData = (
  body: Record<string, string>,
  files: FileEntry[] | undefined
) => {
  const acc = {} as ReconstitutedFormValues;
  if (body) {
    for (const [key, value] of Object.entries(body as Record<string, string>)) {
      handleField(acc, key, value);
    }
  }
  if (files) {
    for (const file of files) {
      const { fieldname, originalname, buffer } = file;
      const uploadFilePath = path.join(uploadsDirectory, originalname);
      console.log("Writing upload file", uploadFilePath);
      fs.writeFile(uploadFilePath, buffer);
      setValue(acc, fieldname, originalname);
    }
  }
  const { copy, slug, ...data } = acc;
  return { copy, slug, data };
};

const refreshContent = () =>
  fetch("http://localhost:8000/__refresh/gatsby-source-filesystem", {
    method: "POST",
  });

const handlers: Record<string, Handler> = {
  async PUT(req, res) {
    const { body, files } = req;
    const { copy, slug, data } = processFormData(body, files);
    const fullFilename = path.join(recipesDirectory, `${slug}.json`);
    try {
      console.log("Updating", fullFilename);
      const fileContent = JSON.stringify(data, undefined, 2);
      if (req.body.slug !== req.params.id && !copy) {
        await fs.unlink(path.join(recipesDirectory, `${req.params.id}.json`));
      }
      await fs.writeFile(fullFilename, fileContent);
      await refreshContent();
      res.json({ status: "Success", fullFilename });
    } catch (e) {
      res.json({ status: "Failure", fullFilename });
    }
  },
  async DELETE(req, res) {
    const fullFilename = path.join(recipesDirectory, `${req.params.id}.json`);
    try {
      console.log("Deleting", fullFilename);
      await fs.unlink(fullFilename);
      await refreshContent();
      res.json({ status: "Success", fullFilename });
    } catch (e) {
      res.json({ status: "Failure", fullFilename });
    }
  },
  async POST(req, res) {
    const { body, files } = req;
    const { data, slug } = processFormData(body, files);
    const fullFilename = path.join(recipesDirectory, `${slug}.json`);
    try {
      console.log("Writing", fullFilename);
      const fileContent = JSON.stringify(data, undefined, 2);
      await fs.writeFile(fullFilename, fileContent);
      await refreshContent();
      res.json({ status: "Success", fullFilename });
    } catch (e) {
      res.json({
        status: "Failure",
        fullFilename,
        error: e ? (e as Error).message || e : undefined,
      });
    }
  },
};

export default async function handler(
  req: GatsbyFunctionRequestWithFiles,
  res: GatsbyFunctionResponse
) {
  const {
    method,
    params: { id },
  } = req;
  if (method) {
    const methodHandler = handlers[method];
    if (methodHandler) {
      return methodHandler(req, res);
    }
  }
  res.end();
}
