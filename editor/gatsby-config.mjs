import path from "path";
import { emptyDir } from "fs-extra";

export default {
  plugins: ["core"],
  developMiddleware: process.env.CYPRESS_SUPPORT
    ? (app) => {
        app.get("/CYPRESS_CLEAR_STATE", async (_req, res) => {
          await Promise.all([
            emptyDir(path.resolve("test", "recipes")),
            emptyDir(path.resolve("test", "uploads")),
          ]);
          res.end();
        });
      }
    : undefined,
};
