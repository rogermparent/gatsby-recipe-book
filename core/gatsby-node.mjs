import slugify from "@sindresorhus/slugify";
import { ensureDir } from "fs-extra";
import path from "path";
import { getContentDirectory } from "./getContentDirectory.mjs";

export const onPreInit = async () => {
  const contentDirectory = getContentDirectory();
  const recipesDirPromise = ensureDir(path.join(contentDirectory, "recipes"));
  const uploadsDirPromise = ensureDir(path.join(contentDirectory, "uploads"));
  await recipesDirPromise;
  await uploadsDirPromise;
};

const makeTerm = (value) => ({ value: value, slug: slugify(value) });

export const createSchemaCustomization = (api) => {
  const {
    actions: { createTypes, createFieldExtension },
    schema,
  } = api;
  createTypes([
    schema.buildObjectType({
      name: "Recipe",
      fields: {
        slug: "String!",
        name: "String!",
        image: { type: "File", extensions: { link: { by: "base" } } },
        ingredients: "[RecipeIngredient!]!",
        ingredientsCount: "Int!",
        instructions: "[RecipeInstruction!]!",
        author: "[RecipeAuthor]",
        datePublished: { type: "String", extensions: { dateformat: {} } },
        description: "String",
        prepTime: "Int",
        cookTime: "Int",
        totalTime: "Int",
        prepTimeString: "String",
        cookTimeString: "String",
        totalTimeString: "String",
        keywords: "[String!]",
        servings: "Int",
        servingSize: "String",
        category: "[String!]!",
        cuisine: "[String!]!",
        nutrition: "RecipeNutrition",
        pagePath: "String!",
      },
      interfaces: ["Node"],
      extensions: {
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: "RecipeAuthor",
      fields: {
        name: "String",
      },
      extensions: {
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: "RecipeNutrition",
      fields: {
        calories: "String",
      },
      extensions: {
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: "RecipeIngredient",
      fields: {
        slug: "String!",
        ingredient: "String!",
        unit: "String",
        quantity: "String",
        note: "String",
      },
      extensions: {
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: "Ingredient",
      fields: {
        slug: "String!",
        name: "String!",
      },
      interfaces: ["Node"],
      extensions: {
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: "RecipeInstruction",
      fields: {
        name: "String",
        text: "String",
      },
      extensions: {
        infer: false,
      },
    }),
  ]);

  createFieldExtension({
    name: "durationformat",
    args: {
      reformat: {
        type: "Boolean",
        defaultValue: false,
      },
    },
    extend() {
      return {
        args: {
          format: "Boolean",
        },
        resolve: (source, args, context, info) => {
          const minutesNumber = context.defaultFieldResolver(
            source,
            args,
            context,
            info
          );
          if (minutesNumber && args.format) {
            const hours = Math.floor(minutesNumber / 60);
            const minutes = minutesNumber % 60;
            return [hours && `${hours}h`, minutes && `${minutes}m`]
              .filter(Boolean)
              .join(" ");
          }
          return minutesNumber;
        },
      };
    },
  });
};

const formatDuration = (minutesNumber) => {
  if (typeof minutesNumber !== "number") return null;
  const hours = Math.floor(minutesNumber / 60);
  const minutes = minutesNumber % 60;
  return [hours > 0 && `${hours}h`, minutes > 0 && `${minutes}m`]
    .filter(Boolean)
    .join(" ");
};

export const onCreateNode = (api) => {
  const { node } = api;
  if (node.internal.type === "RecipesJson") {
    const {
      getNode,
      createNodeId,
      actions: { createNode, createParentChildLink },
    } = api;
    const {
      internal: { contentDigest },
      parent,
    } = node;

    if (parent) {
      const fileNode = getNode(parent);
      const { name: slug } = fileNode;
      const {
        image,
        name,
        description,
        ingredients = [],
        instructions = [],
        author,
        category = [],
        cuisine = [],
        datePublished,
        keywords,
        nutrition,
        cookTime,
        prepTime,
        servings,
        servingSize,
      } = node;

      const totalTime = (prepTime || 0) + (cookTime || 0);

      const idSeed = `Recipe >>> ${slug}`;
      const fields = {
        image,
        name,
        slug,
        ingredients,
        ingredientsCount: ingredients.length,
        description,
        instructions,
        author,
        category,
        cuisine,
        datePublished,
        keywords,
        nutrition,
        cookTimeString: formatDuration(cookTime),
        cookTime,
        prepTimeString: formatDuration(prepTime),
        prepTime,
        totalTimeString: formatDuration(totalTime),
        totalTime,
        servings,
        servingSize,
        pagePath: `/recipe/view/${slug}`,
      };

      const recipeNode = {
        ...fields,
        id: createNodeId(idSeed),
        parent,
        children: [],
        internal: {
          type: "Recipe",
          contentDigest,
        },
      };
      createNode(recipeNode);
      createParentChildLink({
        parent: fileNode,
        child: recipeNode,
      });
    }
  }
};
