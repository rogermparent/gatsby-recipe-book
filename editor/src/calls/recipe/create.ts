export const createRecipe = async (data: FormData, slug: string) => {
  console.log("Submitting", data);
  await fetch(`/api/recipes/${slug}`, {
    method: "POST",
    body: data,
  });
  console.log("Submitted!");
};
