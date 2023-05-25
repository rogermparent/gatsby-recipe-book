import React from "react";
import {
  FieldArrayPath,
  FieldPathByValue,
  useFieldArray,
} from "react-hook-form";
import { RecipeFormValues } from "../../../Recipe/Form";
import { FieldArrayProps, FieldWrapper } from "../../Input";

export function StringListField({
  control,
  register,
  errors,
  label,
  name,
  list,
}: FieldArrayProps & {
  list?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  name: FieldPathByValue<RecipeFormValues, String[]>;
}) {
  const { fields, remove, move, append } = useFieldArray<
    RecipeFormValues,
    FieldPathByValue<RecipeFormValues, string[]>
  >({
    control,
    name,
  });
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <ul>
        {fields.map((field, index) => {
          const fieldName =
            `${name}.${index}` as FieldArrayPath<RecipeFormValues>;
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
