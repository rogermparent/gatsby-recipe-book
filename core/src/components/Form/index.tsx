import React, { ReactNode } from "react";
import {
  Control,
  FieldArrayPath,
  FieldErrors,
  FieldPath,
  FieldValues,
  useFieldArray,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import { DEFAULT_INGREDIENT_SELECTOR_ID } from "../IngredientSelector";
import { RecipeFormValues } from "../Recipe/Form";

export interface CommonFieldProps<T extends FieldValues = RecipeFormValues> {
  label?: string;
  errors?: FieldErrors<T> | undefined;
}

export interface FieldProps<T extends FieldValues = RecipeFormValues>
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

export function FieldWrapper({
  name,
  label,
  errors,
  children,
}: {
  name: string;
  errors?: FieldErrors | undefined;
  label?: string;
  children?: ReactNode;
}): JSX.Element {
  const fieldErrors = errors?.[name];
  return (
    <div>
      <label htmlFor={name}>
        {fieldErrors && (
          <div>
            {fieldErrors.message
              ? fieldErrors.message.toString()
              : fieldErrors.type?.toString()}
          </div>
        )}
        {label && <div>{label}</div>}
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
}: FieldProps & {
  type?: string;
  list?: string;
}) {
  const { name } = registration;
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <input type={type} id={name} list={list} {...registration} />
    </FieldWrapper>
  );
}

export function AuthorListField({
  control,
  register,
  errors,
  label,
  name,
}: FieldArrayProps<RecipeFormValues, "recipe.author"> & { label: string }) {
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
}: FieldArrayProps & { name: "recipe.ingredients" }) {
  const { fields, remove, move, append } = useFieldArray<
    RecipeFormValues,
    "recipe.ingredients"
  >({ control, name });
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <ul>
        {fields.map((field, index) => {
          const fieldName = `${name}.${index}`;
          return (
            <li key={field.id}>
              <InputField
                label="Quantity"
                registration={register(
                  `${fieldName}.quantity` as "recipe.ingredients.0.quantity"
                )}
                errors={errors}
              />
              <InputField
                label="Unit"
                registration={register(
                  `${fieldName}.unit` as "recipe.ingredients.0.unit"
                )}
                errors={errors}
              />
              <InputField
                list={DEFAULT_INGREDIENT_SELECTOR_ID}
                label="Ingredient"
                registration={register(
                  `${fieldName}.ingredient` as "recipe.ingredients.0.ingredient"
                )}
                errors={errors}
              />
              <InputField
                label="Note"
                registration={register(
                  `${fieldName}.note` as "recipe.ingredients.0.note"
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
}: FieldArrayProps<RecipeFormValues, "recipe.instructions">) {
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
                  `${fieldName}.name` as "recipe.instructions.0.name"
                )}
                errors={errors}
              />
              <TextareaField
                label="Text"
                registration={register(
                  `${fieldName}.text` as "recipe.instructions.0.text"
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

type StringFields = "recipe.category" | "recipe.cuisine";

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
              <input list={list} {...register(fieldName)} />
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

export function TextareaField({ label, registration, errors }: FieldProps) {
  const { name } = registration;
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <textarea id={name} {...registration} />
    </FieldWrapper>
  );
}
