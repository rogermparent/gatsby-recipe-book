export const updateRecipe = async (data: FormData, slug: string) => {
  console.log("Submitting", data);
  await fetch(`/api/recipes/${slug}`, {
    method: "PUT",
    body: data,
  });
  console.log("Submitted!");
};
