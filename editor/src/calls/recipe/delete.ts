import { navigate } from "gatsby";

export const deleteRecipe = async (slug: string) => {
  console.log("Deleting", slug);
  await fetch(`/api/recipes/${slug}`, {
    method: "DELETE",
  });
  console.log("Deleted!");
  navigate("/");
};
