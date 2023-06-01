import path from "path";

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
  }
};
