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
  InputField,
  SlugField,
  StringListField,
  TextareaField,
  VisualFieldWrapper,
} from "../../Form";
import { IngredientListField } from "../../Form/Ingredients";
import { InstructionListField } from "../../Form/Instructions";
import { IngredientSelectorDataList } from "../../IngredientSelector";
import * as styles from "./styles.css";

export interface RecipeFormIngredient {
  ingredient: string;
  quantity?: number | null;
  unit?: string | null;
  note?: string | null;
}

export interface RecipeFormInstruction {
  name?: string;
  text?: string;
}

export type RecipeFormValues = Queries.RecipeEditorDataFragment & {
  slug: string;
  copy?: boolean;
  image?: string | null;
  category?: readonly String[] | null;
  cuisine?: readonly String[] | null;
  ingredients?: readonly RecipeFormIngredient[];
  instructions?: readonly RecipeFormInstruction[];
};

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
  edit: boolean;
  form: UseFormReturn<RecipeFormValues>;
  originalData?: Queries.RecipeEditorDataFragment;
}> = ({
  edit,
  form: {
    register,
    control,
    setValue,
    watch,
    formState: { errors, dirtyFields },
  },
  originalData,
}) => {
  const [prepTime, cookTime] = watch(["prepTime", "cookTime"]);
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
        name="name"
        required={true}
        register={register}
      />
      <SlugField
        label="Slug"
        errors={errors}
        name="slug"
        register={register}
        control={control}
      />
      {edit && (
        <FieldWrapper label="Copy" name="copy" errors={errors}>
          <input type="checkbox" id="copy" {...register("copy")} />
        </FieldWrapper>
      )}
      <TextareaField
        label="Description"
        errors={errors}
        name="description"
        register={register}
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
        name="datePublished"
        register={register}
      />
      <InputField
        type="number"
        label="Prep Time (minutes)"
        errors={errors}
        name="prepTime"
        register={register}
      />
      <InputField
        type="number"
        label="Cook Time (minutes)"
        errors={errors}
        name="cookTime"
        register={register}
      />
      <VisualFieldWrapper label="Total Time">
        {(Number(prepTime) || 0) + (Number(cookTime) || 0)}
      </VisualFieldWrapper>
      <InputField
        label="Servings"
        type="number"
        errors={errors}
        name="servings"
        register={register}
      />
      <InputField
        label="Serving Size"
        errors={errors}
        name="servingSize"
        register={register}
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
      <div className={styles.form}>
        <RecipeFields form={form} originalData={originalData} edit={true} />
        <button type="submit">{submitText}</button>
      </div>
    </form>
  );
};
