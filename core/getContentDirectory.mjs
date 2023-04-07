import path from "path";

export const getContentDirectory = () =>
  process.env.CYPRESS_SUPPORT ? path.resolve("test") : path.resolve("content");
