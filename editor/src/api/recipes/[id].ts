import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import path from "path";
import fs from "fs/promises";
import setValue from "lodash/set";

const contentDirectory = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "content"
);
const recipesDirectory = path.resolve(contentDirectory, "recipes");

const uploadsDirectory = path.resolve(contentDirectory, "uploads");

interface GatsbyFunctionRequestWithFiles extends GatsbyFunctionRequest {
  files?: FileEntry[];
}

interface Handler {
  (
    req: GatsbyFunctionRequestWithFiles,
    res: GatsbyFunctionResponse,
    filename: string
  ): Promise<void>;
}

interface ReconstitutedFormValues {
  [key: string]: string | number | ReconstitutedFormValues;
}

const handleField = (
  acc: ReconstitutedFormValues,
  key: string,
  value: string
) => value && setValue(acc, key, value);

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
  return acc;
};

const handlers: Record<string, Handler> = {
  async PUT(req, res, fullFilename) {
    const { body, files } = req;
    try {
      console.log("Updating", fullFilename);
      const data = processFormData(body, files);
      const fileContent = JSON.stringify(data, undefined, 2);
      await fs.writeFile(fullFilename, fileContent);
      res.json({ status: "Success", fullFilename });
    } catch (e) {
      res.json({ status: "Failure", fullFilename });
    }
  },
  async DELETE(_req, res, fullFilename) {
    try {
      console.log("Deleting", fullFilename);
      await fs.unlink(fullFilename);
      res.json({ status: "Success", fullFilename });
    } catch (e) {
      res.json({ status: "Failure", fullFilename });
    }
  },
  async POST(req, res, fullFilename) {
    const { body, files } = req;
    try {
      console.log("Writing", fullFilename);
      const data = processFormData(body, files);
      const fileContent = JSON.stringify(data, undefined, 2);
      await fs.writeFile(fullFilename, fileContent);
      res.json({ status: "Success", fullFilename });
    } catch (e) {
      res.json({ status: "Failure", fullFilename });
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
      const fullFilename = path.join(recipesDirectory, `${id}.json`);
      return methodHandler(req, res, fullFilename);
    }
  }
  res.end();
}
