import { defineConfig } from "cypress";
import { copy, emptyDir, ensureDir } from "fs-extra";
import path from "path";

const recipesPath = path.resolve("test", "recipes");
const uploadsPath = path.resolve("test", "uploads");

const fixturesPath = path.resolve("cypress", "fixtures");

const clear = async () => {
  await Promise.all([emptyDir(recipesPath), emptyDir(uploadsPath)]);
  return null;
};

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8000",
    specPattern: "cypress/e2e",
    testIsolation: false,
    retries: {
      runMode: 3,
      openMode: 2,
    },
    setupNodeEvents(on) {
      on("task", {
        clear,
        async setFixture(fixtureName: string) {
          const fixturePath = path.resolve(fixturesPath, fixtureName);
          await clear();
          await ensureDir(fixturePath);
          await copy(path.resolve(fixturePath, "recipes"), recipesPath);
          await copy(path.resolve(fixturePath, "uploads"), uploadsPath);
          return null;
        },
      });
    },
  },
});
