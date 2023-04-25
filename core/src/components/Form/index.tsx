import React, {
  KeyboardEventHandler,
  ReactNode,
  useCallback,
  useState,
} from "react";
import {
  Control,
  FieldArrayPath,
  FieldArrayWithId,
  FieldErrors,
  FieldPath,
  FieldValues,
  useFieldArray,
  UseFieldArrayReturn,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import { DEFAULT_INGREDIENT_SELECTOR_ID } from "../IngredientSelector";
import { RecipeFormValues } from "../Recipe/Form";
import * as styles from "./styles.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export interface CommonFieldProps<T extends FieldValues = RecipeFormValues> {
  label?: string;
  errors?: FieldErrors<T> | undefined;
}

interface SelfRegisteringFieldProps<T extends FieldValues = RecipeFormValues>
  extends CommonFieldProps<T> {
  register: UseFormRegister<T>;
  name: keyof T;
}

export interface RegisteredFieldProps<T extends FieldValues = RecipeFormValues>
  extends CommonFieldProps<T> {
  registration: UseFormRegisterReturn;
}

export interface FieldArrayProps<
  T extends FieldValues = RecipeFormValues,
  N = FieldArrayPath<T>
> extends CommonFieldProps<T> {
  name: N;
  register: UseFormRegister<T>;
  control: Control<T>;
}

const makeEnterHandler: (
  fieldArray: UseFieldArrayReturn<RecipeFormValues, "ingredients", "id">,
  i: number
) => KeyboardEventHandler =
  ({ fields, append }, i) =>
  (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (i === fields.length - 1) {
        append({} as Queries.RecipeIngredientEditorDataFragment);
      } else {
        document
          .querySelector<HTMLInputElement>(
            `input[name='ingredients.${i + 1}.quantity']`
          )
          ?.focus();
      }
    }
  };

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
  registration,
  errors,
  type,
  list,
  onKeyDown,
}: RegisteredFieldProps & {
  type?: string;
  list?: string;
  onKeyDown?: KeyboardEventHandler;
}) {
  const { name } = registration;
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <input
        type={type}
        id={name}
        list={list}
        className={styles.inputField}
        onKeyDown={onKeyDown}
        {...registration}
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
}: SelfRegisteringFieldProps & {
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
}: FieldArrayProps<RecipeFormValues, "author"> & { label: string }) {
  const { fields, remove, move, append } = useFieldArray({ control, name });
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <ul>
        {fields.map((field, index) => {
          const fieldName: FieldPath<RecipeFormValues> = `${name}.${index}`;
          return (
            <li key={field.id}>
              <InputField
                label="Name"
                registration={register(
                  `${fieldName}.name` as FieldPath<RecipeFormValues>
                )}
                errors={errors}
              />
              <InputField
                label="url"
                registration={register(
                  `${fieldName}.url` as FieldPath<RecipeFormValues>
                )}
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

export function IngredientListField({
  control,
  register,
  errors,
  label,
  name,
}: FieldArrayProps & { name: "ingredients" }) {
  const fieldArray = useFieldArray<RecipeFormValues, "ingredients">({
    control,
    name,
  });
  const { fields, remove, move, append } = fieldArray;
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <ul>
        {fields.map((field, index) => {
          const fieldName = `${name}.${index}`;
          const highlightNextIngredient = makeEnterHandler(fieldArray, index);
          return (
            <li key={field.id}>
              <div className={styles.ingredientFields}>
                <InputField
                  label="Quantity"
                  registration={register(
                    `${fieldName}.quantity` as "ingredients.0.quantity"
                  )}
                  errors={errors}
                  onKeyDown={highlightNextIngredient}
                />
                <InputField
                  label="Unit"
                  registration={register(
                    `${fieldName}.unit` as "ingredients.0.unit"
                  )}
                  errors={errors}
                  onKeyDown={highlightNextIngredient}
                />
                <InputField
                  list={DEFAULT_INGREDIENT_SELECTOR_ID}
                  label="Ingredient"
                  registration={register(
                    `${fieldName}.ingredient` as "ingredients.0.ingredient"
                  )}
                  errors={errors}
                  onKeyDown={highlightNextIngredient}
                />
                <InputField
                  label="Note"
                  registration={register(
                    `${fieldName}.note` as "ingredients.0.note"
                  )}
                  errors={errors}
                  onKeyDown={highlightNextIngredient}
                />
              </div>
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
      <button
        type="button"
        onClick={() => append({} as Queries.RecipeIngredientEditorDataFragment)}
      >
        Add Ingredient
      </button>
    </FieldWrapper>
  );
}

export function InstructionListField({
  control,
  register,
  errors,
  label,
  name,
}: FieldArrayProps<RecipeFormValues, "instructions">) {
  const { fields, remove, move, append } = useFieldArray({ control, name });
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <ul>
        {fields.map((field, index) => {
          const fieldName = `${name}.${index}`;
          return (
            <li key={field.id}>
              <InputField
                label="Name"
                registration={register(
                  `${fieldName}.name` as "instructions.0.name"
                )}
                errors={errors}
              />
              <TextareaField
                label="Text"
                registration={register(
                  `${fieldName}.text` as "instructions.0.text"
                )}
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
      <button
        type="button"
        onClick={() =>
          append({} as Queries.RecipeInstructionEditorDataFragment)
        }
      >
        Add Instruction
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
}: FieldArrayProps<RecipeFormValues, StringFields> & { list?: string }) {
  const { fields, remove, move, append } = useFieldArray({
    control,
    name,
  });
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <ul>
        {fields.map((field, index) => {
          const fieldName = `${name}.${index}` as FieldPath<RecipeFormValues>;
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

export function TextareaField({
  label,
  registration,
  errors,
}: RegisteredFieldProps) {
  const { name } = registration;
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <textarea id={name} className={styles.inputField} {...registration} />
    </FieldWrapper>
  );
}
