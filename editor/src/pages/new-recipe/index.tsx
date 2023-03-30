import React from "react";
import { HeadFC, PageProps, navigate } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import {
  RecipeFields,
  NewRecipeFormValues,
  RecipeFormValues,
} from "core/src/components/Recipe/Form";
import { createRecipe } from "../../calls/recipe/create";
import { UseFormReturn, useForm } from "react-hook-form";
import PageTitle from "core/src/components/PageTitle";
import { Metadata } from "core/src/components/Metadata";
import { buildFormData } from "../../calls/recipe/process";
import { InputField } from "core/src/components/Form";

const onSubmit = (data: NewRecipeFormValues) => {
  const { slug, ...recipe } = data;
  createRecipe(buildFormData(recipe), slug).then(() => {
    navigate("/");
  });
};

const EditPage: React.FC<PageProps> = () => {
  const form = useForm<NewRecipeFormValues>({});
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;
  return (
    <SiteLayout>
      <PageTitle>New Recipe</PageTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputField
            label="Slug"
            errors={errors}
            registration={register("slug", { required: true })}
          />
          <RecipeFields form={form as UseFormReturn<RecipeFormValues>} />
          <button type="submit">Create Recipe</button>
        </div>
      </form>
    </SiteLayout>
  );
};

export default EditPage;

export const Head: HeadFC = () => <Metadata title="Edit a Recipe" />;
