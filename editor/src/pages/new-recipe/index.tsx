import React from "react";
import { HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import {
  NewRecipeFormValues,
  RecipeFields,
} from "core/src/components/Recipe/Form";
import { createRecipe } from "../../calls/recipe/create";
import { useForm } from "react-hook-form";

const EditPage: React.FC<PageProps> = () => {
  const form = useForm<NewRecipeFormValues>({});
  const { handleSubmit } = form;
  const onSubmit = ({ slug, recipe }: NewRecipeFormValues) =>
    createRecipe(recipe, slug);
  return (
    <SiteLayout>
      <h2>New Recipe</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <RecipeFields form={form} />
          <button type="submit">Create Recipe</button>
        </div>
      </form>
    </SiteLayout>
  );
};

export default EditPage;

export const Head: HeadFC = () => <title>Edit a Recipe</title>;
