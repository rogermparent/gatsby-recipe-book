import path from "path";
import fs from "fs/promises";
import setValue from "lodash/set.js";
import { getContentDirectory } from "core/getContentDirectory.mjs";
import { graphql } from "gatsby";

const contentDirectory = getContentDirectory();
const recipesDirectory = path.resolve(contentDirectory, "recipes");
const uploadsDirectory = path.resolve(contentDirectory, "uploads");

const fieldHandlers = {
  servings: Number,
  prepTime: Number,
  cookTime: Number,
  totalTime: Number,
  copy: Boolean,
};

const handleField = (acc, key, value) =>
  value &&
  setValue(acc, key, fieldHandlers[key] ? fieldHandlers[key](value) : value);

const processFormData = (body, files) => {
  const acc = {};
  if (body) {
    for (const [key, value] of Object.entries(body)) {
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

const refreshContent = (emitter) => {
  emitter.emit(`WEBHOOK_RECEIVED`, {
    pluginName: `gatsby-source-filesystem`,
  });
};

const awaitingPageCreation = {};

export const createPages = async ({ graphql, actions: { createPage } }) => {
  const { data } = await graphql(`
    query CreateRecipePages {
      allRecipe {
        nodes {
          slug
          id
        }
      }
    }
  `);
  for (const { id, slug } of data.allRecipe.nodes) {
    const viewPagePath = "/recipe/view/" + slug;
    await createPage({
      path: viewPagePath,
      component: path.resolve("./src/layouts/recipe/view.tsx"),
      context: {
        id,
      },
    });
    const editPagePath = "/recipe/edit/" + slug;
    await createPage({
      path: editPagePath,
      component: path.resolve("./src/layouts/recipe/edit.tsx"),
      context: {
        id,
      },
    });
    const awaitingResolve = awaitingPageCreation[slug];
    if (awaitingResolve) {
      setTimeout(awaitingResolve, 0);
      delete awaitingPageCreation[slug];
    }
  }
};

const makePageCreationPromise = (slug) => {
  const pageCreationPromise = new Promise((resolve) => {
    awaitingPageCreation[slug] = resolve;
  });
  return pageCreationPromise;
};

export const onCreateDevServer = ({ app }) => {
  app.post("/api/recipes/:id", async (req, res) => {
    const { body, files } = req;
    const { data, slug } = processFormData(body, files);
    const fullFilename = path.join(recipesDirectory, `${slug}.json`);
    try {
      const pageCreationPromise = makePageCreationPromise(slug);
      console.log("Writing", fullFilename);
      const fileContent = JSON.stringify(data, undefined, 2);
      await fs.writeFile(fullFilename, fileContent);
      refreshContent();
      await pageCreationPromise;
      res.json({ status: "Success", fullFilename });
    } catch (e) {
      res.json({
        status: "Failure",
        fullFilename,
        error: e ? e.message || e : undefined,
      });
    }
  });
  app.put("/api/recipes/:id", async (req, res) => {
    const { body, files } = req;
    const { copy, slug, data } = processFormData(body, files);
    const fullFilename = path.join(recipesDirectory, `${slug}.json`);
    try {
      const pageCreationPromise = makePageCreationPromise(slug);
      console.log("Updating", fullFilename);
      const fileContent = JSON.stringify(data, undefined, 2);
      await fs.writeFile(fullFilename, fileContent);
      if (req.body.slug !== req.params.id && !copy) {
        await fs.unlink(path.join(recipesDirectory, `${req.params.id}.json`));
      }
      refreshContent();
      await pageCreationPromise;
      res.json({ status: "Success", fullFilename });
    } catch (e) {
      res.json({ status: "Failure", fullFilename });
    }
  });
  app.delete("/api/recipes/:id", async (req, res) => {
    const fullFilename = path.join(recipesDirectory, `${req.params.id}.json`);
    try {
      console.log("Deleting", fullFilename);
      await fs.unlink(fullFilename);
      refreshContent();
      res.json({ status: "Success", fullFilename });
    } catch (e) {
      res.json({ status: "Failure", fullFilename });
    }
  });
};
