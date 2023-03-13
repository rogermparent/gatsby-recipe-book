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

export default async function handler(
  req: GatsbyFunctionRequest<ContactBody>,
  res: GatsbyFunctionResponse
) {
  const { method } = req;
  if (method === "POST") {
    const { body } = req;
    const filename = new Date().toISOString();
    const fullFilename = path.join(contentDirectory, filename + ".json");
    try {
      console.log("Writing", fullFilename);
      const fileContent = JSON.stringify(body, undefined, 2);
      await fs.writeFile(fullFilename, fileContent);
      res.json({ status: "Success", fullFilename });
    } catch (e) {
      res.json({ status: "Failure", fullFilename });
    }
  }
  res.end();
}
