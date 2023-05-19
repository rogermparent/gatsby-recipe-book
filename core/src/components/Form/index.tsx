import React, { KeyboardEventHandler, ReactNode, useState } from "react";
import {
  Control,
  FieldArrayPath,
  FieldErrors,
  FieldPath,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { RecipeFormValues } from "../Recipe/Form";
import * as styles from "./styles.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import slugify from "@sindresorhus/slugify";

export interface FieldProps {
  label?: string;
  name: FieldPath<RecipeFormValues>;
  errors?: FieldErrors<RecipeFormValues> | undefined;
  register: UseFormRegister<RecipeFormValues>;
  required?: boolean;
}

export interface FieldArrayProps extends FieldProps {
  name: FieldArrayPath<RecipeFormValues>;
  control: Control<RecipeFormValues>;
}

export function VisualFieldWrapper({
  label,
  children,
  className,
}: {
  label?: string;
  children?: ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div className={className}>
      <div className={styles.fieldLabelWrapper}>
        {label && <div className={styles.fieldLabelHeading}>{label}</div>}
        {children}
      </div>
    </div>
  );
}

export function FieldWrapper({
  name,
  label,
  errors,
  children,
  className,
}: {
  name: string;
  errors?: FieldErrors | undefined;
  label?: string;
  children?: ReactNode;
  className?: string;
}): JSX.Element {
  const fieldErrors = errors?.[name];
  return (
    <div className={className}>
      <label htmlFor={name} className={styles.fieldLabelWrapper}>
        {fieldErrors && (
          <div>
            {fieldErrors.message
              ? fieldErrors.message.toString()
              : fieldErrors.type?.toString()}
          </div>
        )}
        {label && <div className={styles.fieldLabelHeading}>{label}</div>}
        {children}
      </label>
    </div>
  );
}

export function InputField({
  label,
  register,
  name,
  required,
  errors,
  type,
  list,
  onKeyDown,
}: FieldProps & {
  type?: string;
  list?: string;
  onKeyDown?: KeyboardEventHandler;
}) {
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <input
        type={type}
        id={name}
        list={list}
        className={styles.inputField}
        onKeyDown={onKeyDown}
        {...register(name, { required })}
      />
    </FieldWrapper>
  );
}

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

export function ImageField({
  label,
  register,
  name,
  errors,
  originalData,
  isDirty,
  setValue,
}: FieldProps & {
  originalData?: Queries.RecipeImageEditorDataFragment | null;
  isDirty: boolean | undefined;
  setValue: UseFormSetValue<RecipeFormValues>;
}): JSX.Element {
  const [imagePreviewURL, setImagePreviewURL] = useState<string | undefined>();
  const imageData =
    originalData?.childImageSharp && getImage(originalData.childImageSharp);
  return (
    <FieldWrapper label={label} errors={errors} name={name}>
      {imagePreviewURL ? (
        <div className={styles.editorImageContainer}>
          <img src={imagePreviewURL} className={styles.editorPreviewImage} />
        </div>
      ) : !isDirty && imageData ? (
        <div className={styles.editorImageContainer}>
          <GatsbyImage
            image={imageData}
            alt=""
            className={styles.defaultEditorPreviewImage}
          />
        </div>
      ) : null}
      <input
        type="file"
        {...register(name, {
          onChange: (e) => {
            const newFile = e.target.files[0];
            if (newFile) {
              const oldPreviewURL = imagePreviewURL;
              setImagePreviewURL(URL.createObjectURL(newFile));
              if (oldPreviewURL) {
                URL.revokeObjectURL(oldPreviewURL);
              }
            }
          },
        })}
      />
      <button
        type="button"
        onClick={() => {
          setValue(name, null);
          setImagePreviewURL(undefined);
        }}
      >
        Clear
      </button>
    </FieldWrapper>
  );
}

export function AuthorListField({
  control,
  register,
  errors,
  label,
  name,
}: FieldArrayProps & { name: "author"; label: string }) {
  const { fields, remove, move, append } = useFieldArray({ control, name });
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <ul>
        {fields.map((field, index) => {
          const fieldName = `${name}.${index}` as FieldPath<RecipeFormValues>;
          return (
            <li key={field.id}>
              <InputField
                label="Name"
                name={`${fieldName}.name` as "author.0.name"}
                register={register}
                errors={errors}
              />
              <div>
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => move(index, index - 1)}
                >
                  &uarr;
                </button>
                <button type="button" onClick={() => remove(index)}>
                  &#x274C;
                </button>
                <button
                  type="button"
                  onClick={() => move(index, index + 1)}
                  disabled={Boolean(
                    fields.length && index === fields.length - 1
                  )}
                >
                  &darr;
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={() => append({ name: null })}>
        Add Author
      </button>
    </FieldWrapper>
  );
}

type StringFields = "category" | "cuisine";

export function StringListField({
  control,
  register,
  errors,
  label,
  name,
  list,
}: FieldArrayProps & { list?: string; name: StringFields }) {
  const { fields, remove, move, append } = useFieldArray<
    RecipeFormValues,
    StringFields
  >({
    control,
    name,
  });
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <ul className={styles.list}>
        {fields.map((field, index) => {
          const fieldName =
            `${name}.${index}` as FieldArrayPath<RecipeFormValues>;
          return (
            <li key={field.id}>
              <input
                list={list}
                className={styles.inputField}
                {...register(fieldName)}
              />
              <div>
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => move(index, index - 1)}
                >
                  &uarr;
                </button>
                <button type="button" onClick={() => remove(index)}>
                  &#x274C;
                </button>
                <button
                  type="button"
                  onClick={() => move(index, index + 1)}
                  disabled={Boolean(
                    fields.length && index === fields.length - 1
                  )}
                >
                  &darr;
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={() => append(new String())}>
        Add {label}
      </button>
    </FieldWrapper>
  );
}

export function TextareaField({ label, register, name, errors }: FieldProps) {
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <textarea id={name} className={styles.inputField} {...register(name)} />
    </FieldWrapper>
  );
}
