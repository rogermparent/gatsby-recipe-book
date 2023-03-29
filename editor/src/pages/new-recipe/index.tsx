import React from "react";
import { HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import {
  RecipeFormValues,
  RecipeFields,
} from "core/src/components/Recipe/Form";
import { createRecipe } from "../../calls/recipe/create";
import { useForm } from "react-hook-form";
import { processRecipe } from "../../calls/recipe/process";
import PageTitle from "core/src/components/PageTitle";
import { Metadata } from "core/src/components/Metadata";

const EditPage: React.FC<PageProps> = () => {
  const form = useForm<RecipeFormValues>({});
  const { handleSubmit } = form;
  const onSubmit = ({ slug, recipe }: RecipeFormValues) =>
    createRecipe(processRecipe(recipe), slug);
  return (
    <SiteLayout>
      <PageTitle>New Recipe</PageTitle>
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

export const Head: HeadFC = () => <Metadata title="Edit a Recipe" />;
