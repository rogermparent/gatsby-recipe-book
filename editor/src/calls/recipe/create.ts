import { navigate } from "gatsby";

export const createRecipe = async (
  data: Queries.RecipeEditorDataFragment,
  slug: string
) => {
  console.log("Submitting", data);
  await fetch(`/api/recipes/${slug}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data, undefined, 2),
  });
  console.log("Submitted!");
  navigate("/");
};
