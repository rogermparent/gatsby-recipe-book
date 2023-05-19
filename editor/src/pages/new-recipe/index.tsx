import React from "react";
import { HeadFC, PageProps } from "gatsby";
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
import * as recipeFormStyles from "core/src/components/Recipe/Form/styles.css";

const onSubmit = async (data: RecipeFormValues) => {
  const { slug, ...recipe } = data;
  console.log(buildFormData(recipe));
  const massagedFields = massageFormData(data);
  const formData = buildFormData(massagedFields);
  await createRecipe(formData, slug);
  window.location.href = `/recipe/${massagedFields.slug}`;
};

const EditPage: React.FC<PageProps> = () => {
  const form = useForm<RecipeFormValues>({});
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;
  return (
    <SiteLayout>
      <PageTitle>New Recipe</PageTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={recipeFormStyles.form}>
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

export default EditPage;

export const Head: HeadFC = () => <Metadata title="Edit a Recipe" />;
