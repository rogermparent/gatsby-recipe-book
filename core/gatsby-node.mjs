export const createSchemaCustomization = ({
  actions: { createTypes, createFieldExtension },
  schema,
}) => {
  const buildLinkType = (name) =>
    schema.buildObjectType({
      name,
      fields: {
        value: "String!",
      },
      interfaces: ["Node"],
      extensions: {
        infer: false,
      },
    });

  createTypes([
    schema.buildObjectType({
      name: "Recipe",
      fields: {
        slug: "String!",
        name: "String!",
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
      },
      interfaces: ["Node"],
      extensions: {
        infer: false,
      },
    }),
    buildLinkType("IngredientLink"),
    buildLinkType("CategoryLink"),
    buildLinkType("CuisineLink"),
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

export const onCreateNode = ({
  node,
  getNode,
  createNodeId,
  createContentDigest,
  actions: { createNode, createParentChildLink },
}) => {
  if (node.internal.type === "RecipesJson") {
    const {
      internal: { contentDigest },
      parent,
    } = node;

    if (parent) {
      const fileNode = getNode(parent);
      const { name: slug } = fileNode;
      const {
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
        totalTime,
        servings,
        servingSize,
      } = node;

      const idSeed = `Recipe >>> ${slug}`;
      const fields = {
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

      const createTaxonomyLinkNodes = ({ terms, type }) => {
        if (terms) {
          for (const value of terms) {
            const idSeed = `${type} >>> ${slug} >>> ${value}`;
            const fields = {
              value,
            };
            const recipeIngredientNode = {
              ...fields,
              id: createNodeId(idSeed),
              parent: recipeNode.id,
              internal: {
                type,
                contentDigest: createContentDigest(fields),
              },
            };
            createNode(recipeIngredientNode);
            createParentChildLink({
              parent: recipeNode,
              child: recipeIngredientNode,
            });
          }
        }
      };

      createTaxonomyLinkNodes({
        terms: ingredients?.map(({ ingredient }) => ingredient),
        type: "IngredientLink",
      });
      createTaxonomyLinkNodes({
        terms: category,
        type: "CategoryLink",
      });
      createTaxonomyLinkNodes({
        terms: cuisine,
        type: "CuisineLink",
      });
    }
  }
};
