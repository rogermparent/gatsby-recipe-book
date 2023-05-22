import React, { KeyboardEventHandler } from "react";
import { Control, useWatch } from "react-hook-form";
import * as styles from "../../styles.css";
import slugify from "@sindresorhus/slugify";
import { FieldProps, FieldWrapper } from "../../Input";
import { RecipeFormValues } from "../../../Recipe/Form";

export function SlugField({
  label,
  register,
  name,
  required,
  errors,
  type,
  list,
  control,
}: FieldProps & {
  type?: string;
  list?: string;
  onKeyDown?: KeyboardEventHandler;
  control: Control<RecipeFormValues>;
}) {
  const recipeName = useWatch<RecipeFormValues, "name">({
    control,
    name: "name",
  });
  const defaultSlug = recipeName ? slugify(recipeName) : "";
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <input
        type={type}
        id={name}
        list={list}
        className={styles.inputField}
        placeholder={defaultSlug}
        {...register(name, { required })}
      />
    </FieldWrapper>
  );
}
