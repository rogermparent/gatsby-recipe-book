import React from "react";
import { FieldPath, useFieldArray } from "react-hook-form";
import { RecipeFormValues } from "../../../Recipe/Form";
import { FieldArrayProps, FieldWrapper, InputField } from "../../Input";

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
