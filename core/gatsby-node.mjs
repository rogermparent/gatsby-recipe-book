export const createSchemaCustomization = ({
  actions: { createTypes, createFieldExtension },
  schema,
}) => {
  createTypes([
    schema.buildObjectType({
      name: "Recipe",
      fields: {
        slug: "String!",
        name: "String!",
        ingredients: "[RecipeIngredient!]!",
        ingredientsCount: "Int!",
        instructions: "[RecipeInstruction!]!",
        author: "String",
        datePublished: { type: "String", extensions: { dateformat: {} } },
        description: "String",
        prepMinutes: "Int",
        cookMinutes: "Int",
        totalMinutes: "Int",
        prepTime: "String",
        cookTime: "String",
        totalTime: "String",
        keywords: "String",
        servings: "Int",
        servingSize: "String",
        category: "String",
        cuisine: "String",
      },
      interfaces: ["Node"],
      extensions: {
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: "IngredientLink",
      fields: {
        ingredient: "String!",
        ingredientSlug: "String!",
        recipeSlug: "String!",
        recipe: {
          type: "Recipe",
          extensions: {
            link: {
              by: "slug",
              from: "recipeSlug",
            },
          },
        },
      },
      interfaces: ["Node"],
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

export const onCreateNode = ({
  node,
  getNode,
  createNodeId,
  actions: { createNode, createParentChildLink },
}) => {
  if (node.internal.type === "RecipesJson") {
    const {
      title,
      content,
      internal: { contentDigest },
      parent,
      id,
    } = node;
    if (parent) {
      const fileNode = getNode(parent);
      if (fileNode) {
        const { name } = fileNode;
        if (name) {
          const fields = {
            title,
            content,
            filename: name,
            slug: name,
          };

          const postNode = {
            ...fields,
            id: createNodeId(`${id} >>> Post`),
            internal: {
              type: "Post",
              contentDigest,
            },
          };

          createNode(postNode);
          createParentChildLink({ parent: node, child: postNode });
        }
      }
    }
  }
};
