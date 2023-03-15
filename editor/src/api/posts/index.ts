import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import path from "path";
import fs from "fs/promises";
import format from "date-fns/format";
import kebabCase from "lodash/kebabCase";

interface ContactBody {
  title: string;
  content: string;
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

    const filename = `${format(new Date(), "yyyy-mm-dd-hh-mm-ss")}-${kebabCase(
      body.title
    )}`;
    const fullFilename = path.join(contentDirectory, `${filename}.json`);
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
