/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
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
  FieldWrapper,
  ImageField,
  IngredientListField,
  InputField,
  InstructionListField,
  StringListField,
  TextareaField,
} from "../../Form";
import { IngredientSelectorDataList } from "../../IngredientSelector";

export type FormRecipe = Queries.RecipeEditorDataFragment & {
  image?: string | null;
  category?: readonly String[] | null;
  cuisine?: readonly String[] | null;
};

export interface NewRecipeFormValues extends FormRecipe {
  slug: string;
}

export type RecipeFormValues = NewRecipeFormValues | FormRecipe;

export const buildPlaceholderStrings = (
  strings: readonly string[] | null
): readonly string[] | null =>
  strings && strings.map((value) => new String(value) as string);

export const initializeFormState: (
  recipe: Queries.RecipeEditorDataFragment
) => RecipeFormValues = (recipe) => {
  const result = {
    ...recipe,
    cuisine: buildPlaceholderStrings(recipe.cuisine),
    category: buildPlaceholderStrings(recipe.category),
    image: recipe.image?.base || null,
  } as RecipeFormValues;
  return result;
};

export const RecipeFields: React.FC<{
  form: UseFormReturn<RecipeFormValues>;
  originalData?: Queries.RecipeEditorDataFragment;
}> = ({
  form: {
    register,
    control,
    setValue,
    formState: { errors, dirtyFields },
  },
  originalData,
}) => {
  return (
    <>
      <IngredientSelectorDataList />
      <CategorySelectorDataList />
      <CuisineSelectorDataList />
      <ImageField
        label="Image"
        errors={errors}
        register={register}
        name="image"
        originalData={originalData?.image}
        setValue={setValue}
        isDirty={Boolean(dirtyFields.image)}
      />
      <InputField
        label="Name"
        errors={errors}
        registration={register("name", { required: true })}
      />
      <TextareaField
        label="Description"
        errors={errors}
        registration={register("description")}
      />
      <AuthorListField
        label="Author"
        errors={errors}
        register={register}
        control={control}
        name="author"
      />
      <InputField
        label="Date Published"
        type="date"
        errors={errors}
        registration={register("datePublished")}
      />
      <InputField
        type="number"
        label="Prep Time (minutes)"
        errors={errors}
        registration={register("prepTime")}
      />
      <InputField
        type="number"
        label="Cook Time (minutes)"
        errors={errors}
        registration={register("cookTime")}
      />
      <InputField
        type="number"
        label="Total Time (minutes)"
        errors={errors}
        registration={register("totalTime")}
      />
      <InputField
        label="Servings"
        type="number"
        errors={errors}
        registration={register("servings")}
      />
      <InputField
        label="Serving Size"
        errors={errors}
        registration={register("servingSize")}
      />
      <StringListField
        label="Category"
        errors={errors}
        register={register}
        control={control}
        list={DEFAULT_CATEGORY_SELECTOR_ID}
        name="category"
      />
      <StringListField
        label="Cuisine"
        errors={errors}
        register={register}
        control={control}
        list={DEFAULT_CUISINE_SELECTOR_ID}
        name="cuisine"
      />
      <IngredientListField
        label="Ingredients"
        errors={errors}
        register={register}
        control={control}
        name="ingredients"
      />
      <InstructionListField
        label="Instructions"
        errors={errors}
        register={register}
        control={control}
        name="instructions"
      />
    </>
  );
};

export const RecipeForm: React.FC<{
  defaultValues?: RecipeFormValues;
  onSubmit: SubmitHandler<RecipeFormValues>;
  submitText: string;
  originalData?: Queries.RecipeEditorDataFragment;
}> = ({ defaultValues, onSubmit, submitText, originalData }) => {
  const form = useForm({ defaultValues });
  const { handleSubmit } = form;
  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div>
        <RecipeFields form={form} originalData={originalData} />
        <button type="submit">{submitText}</button>
      </div>
    </form>
  );
};
