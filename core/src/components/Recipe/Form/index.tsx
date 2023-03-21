/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  CategorySelectorDataList,
  DEFAULT_CATEGORY_SELECTOR_ID,
} from "../../CategorySelector";
import {
  CuisineSelectorDataList,
  DEFAULT_CUISINE_SELECTOR_ID,
} from "../../CuisineSelector";
import {
  AuthorListField,
  IngredientListField,
  InputField,
  InstructionListField,
  StringListField,
  TextareaField,
} from "../../Form";
import { IngredientSelectorDataList } from "../../IngredientSelector";

export type FormRecipe = Queries.RecipeEditorDataFragment & {
  category?: readonly String[] | null;
  cuisine?: readonly String[] | null;
};

export interface NewRecipeFormValues {
  slug: string;
  recipe: FormRecipe;
}

export interface ExistingRecipeFormValues {
  recipe: FormRecipe;
}

export interface RecipeFormValues
  extends NewRecipeFormValues,
    ExistingRecipeFormValues {}

export const buildPlaceholderStrings = (
  strings: readonly string[] | null
): readonly string[] | null =>
  strings && strings.map((value) => new String(value) as string);

export const initializeFormState: (
  recipe: Queries.RecipeEditorDataFragment
) => RecipeFormValues = (recipe) =>
  ({
    recipe: {
      ...recipe,
      cuisine: buildPlaceholderStrings(recipe.cuisine),
      category: buildPlaceholderStrings(recipe.category),
    },
  } as RecipeFormValues);

export const RecipeFields: React.FC<{
  form: UseFormReturn<RecipeFormValues>;
}> = ({
  form: {
    register,
    control,
    formState: { errors },
  },
}) => {
  return (
    <>
      <IngredientSelectorDataList />
      <CategorySelectorDataList />
      <CuisineSelectorDataList />
      <InputField
        label="Name"
        errors={errors}
        registration={register("recipe.name", { required: true })}
      />
      <TextareaField
        label="Description"
        errors={errors}
        registration={register("recipe.description")}
      />
      <AuthorListField
        label="Author"
        errors={errors}
        register={register}
        control={control}
        name="recipe.author"
      />
      <InputField
        label="Date Published"
        type="date"
        errors={errors}
        registration={register("recipe.datePublished")}
      />
      <InputField
        type="number"
        label="Prep Time (minutes)"
        errors={errors}
        registration={register("recipe.prepTime")}
      />
      <InputField
        type="number"
        label="Cook Time (minutes)"
        errors={errors}
        registration={register("recipe.cookTime")}
      />
      <InputField
        type="number"
        label="Total Time (minutes)"
        errors={errors}
        registration={register("recipe.totalTime")}
      />
      <InputField
        label="Servings"
        type="number"
        errors={errors}
        registration={register("recipe.servings")}
      />
      <InputField
        label="Serving Size"
        errors={errors}
        registration={register("recipe.servingSize")}
      />
      <StringListField
        label="Category"
        errors={errors}
        register={register}
        control={control}
        list={DEFAULT_CATEGORY_SELECTOR_ID}
        name="recipe.category"
      />
      <StringListField
        label="Cuisine"
        errors={errors}
        register={register}
        control={control}
        list={DEFAULT_CUISINE_SELECTOR_ID}
        name="recipe.cuisine"
      />
      <IngredientListField
        label="Ingredients"
        errors={errors}
        register={register}
        control={control}
        name="recipe.ingredients"
      />
      <InstructionListField
        label="Instructions"
        errors={errors}
        register={register}
        control={control}
        name="recipe.instructions"
      />
    </>
  );
};

export const RecipeForm: React.FC<{
  defaultValues?: RecipeFormValues;
  onSubmit: (data: RecipeFormValues) => void;
  submitText: string;
}> = ({ defaultValues, onSubmit, submitText }) => {
  const form = useForm({ defaultValues });
  const { handleSubmit } = form;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <RecipeFields form={form} />
        <button type="submit">{submitText}</button>
      </div>
    </form>
  );
};
