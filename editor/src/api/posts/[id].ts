import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import path from "path";
import fs from "fs/promises";

interface ContactBody {
  message: string;
}

const contentDirectory = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "content",
  "posts"
);

interface Handler {
  (
    req: GatsbyFunctionRequest<ContactBody>,
    res: GatsbyFunctionResponse,
    filename: string
  ): Promise<void>;
}

const handlers: Record<string, Handler> = {
  async PUT(req, res, fullFilename) {
    const { body } = req;
    try {
      console.log("Updating", fullFilename);
      const fileContent = JSON.stringify(body, undefined, 2);
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
};

export default async function handler(
  req: GatsbyFunctionRequest<ContactBody>,
  res: GatsbyFunctionResponse
) {
  const {
    method,
    params: { id },
  } = req;
  if (method) {
    const methodHandler = handlers[method];
    if (methodHandler) {
      const fullFilename = path.join(contentDirectory, id + ".json");
      return methodHandler(req, res, fullFilename);
    }
  }
  res.end();
}
