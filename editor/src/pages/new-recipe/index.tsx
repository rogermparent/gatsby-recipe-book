import React from "react";
import { HeadFC, navigate, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import {
  RecipeFields,
  RecipeFormValues,
} from "core/src/components/Recipe/Form";
import { createRecipe } from "../../calls/recipe/create";
import { UseFormReturn, useForm } from "react-hook-form";
import PageTitle from "core/src/components/PageTitle";
import { Metadata } from "core/src/components/Metadata";
import { buildFormData, massageFormData } from "../../calls/recipe/process";

import { waitForPageToExist } from "../../util/wait-for-page";

const onSubmit = async (data: RecipeFormValues) => {
  const massagedFields = massageFormData(data);
  const formData = buildFormData(massagedFields);
  await createRecipe(formData, massagedFields.slug);
  const url = `/recipe/${massagedFields.slug}`;
  await waitForPageToExist(url);
  navigate(url);
};

const NewRecipePage: React.FC<PageProps> = () => {
  const form = useForm<RecipeFormValues>({
    defaultValues: { datePublished: new Date().toISOString().slice(0, 10) },
  });
  const { handleSubmit } = form;
  return (
    <SiteLayout>
      <PageTitle>New Recipe</PageTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <RecipeFields
            form={form as UseFormReturn<RecipeFormValues>}
            edit={false}
          />
          <button type="submit">Create Recipe</button>
        </div>
      </form>
    </SiteLayout>
  );
};

export default NewRecipePage;

export const Head: HeadFC = () => <Metadata title="Edit a Recipe" />;
