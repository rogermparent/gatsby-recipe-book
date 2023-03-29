export const processRecipe = (
  input: Queries.RecipeEditorDataFragment
): Queries.RecipeEditorDataFragment => {
  const { datePublished } = input;
  console.log(input);
  return {
    ...input,
    datePublished: datePublished || null,
  };
};
