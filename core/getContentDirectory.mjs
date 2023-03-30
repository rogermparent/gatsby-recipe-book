import path from "path";

export const getContentDirectory = () =>
  process.env.TESTING ? path.resolve("test") : path.resolve("content");
