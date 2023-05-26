import React, { KeyboardEventHandler, useRef, useState } from "react";
import {
  FieldArray,
  useFieldArray,
  UseFieldArrayReturn,
} from "react-hook-form";
import * as styles from "./styles.css";

import { parseIngredient } from "parse-ingredient";
import { RecipeFormIngredient, RecipeFormValues } from "../../../Recipe/Form";
import { FieldArrayProps, FieldWrapper, InputField } from "../../Input";
import { DEFAULT_INGREDIENT_SELECTOR_ID } from "../../../IngredientSelector";

const makeIngredientEnterHandler: (
  fieldArray: UseFieldArrayReturn<RecipeFormValues, "ingredients">,
  i: number
) => KeyboardEventHandler =
  ({ fields, append }, i) =>
  (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (i === fields.length - 1) {
        append({} as FieldArray<RecipeFormValues, "ingredients">);
      } else {
        document
          .querySelector<HTMLInputElement>(
            `input[name='ingredients.${i + 1}.quantity']`
          )
          ?.focus();
      }
    }
  };

export function IngredientListField({
  control,
  register,
  errors,
  label,
  name,
}: FieldArrayProps & { name: "ingredients" }) {
  const fieldArray = useFieldArray({
    control,
    name,
  });
  const [importMode, setImportMode] = useState<boolean>(false);

  const { fields, remove, move, append, insert } = fieldArray;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      {importMode ? (
        <>
          <textarea ref={textareaRef} />
          <div>
            <button
              onClick={() => {
                if (textareaRef.current) {
                  const parsedIngredients = parseIngredient(
                    textareaRef.current.value
                  );
                  const finalIngredients: RecipeFormIngredient[] = [];
                  for (const parsedIngredient of parsedIngredients) {
                    if (!parsedIngredient.isGroupHeader) {
                      const { description, quantity, unitOfMeasure } =
                        parsedIngredient;
                      finalIngredients.push({
                        ingredient: description,
                        quantity: quantity,
                        unit: unitOfMeasure,
                      });
                    }
                  }
                  console.log(finalIngredients);
                  fieldArray.replace(finalIngredients);
                }
                setImportMode(false);
              }}
            >
              Import
            </button>
            <button
              onClick={() => {
                setImportMode(false);
              }}
            >
              Abort
            </button>
          </div>
        </>
      ) : (
        <>
          <ul>
            {fields.map((field, index) => {
              const fieldName = `${name}.${index}`;
              const highlightNextIngredient = makeIngredientEnterHandler(
                fieldArray,
                index
              );
              return (
                <li key={field.id} className={styles.listItem}>
                  <div className={styles.fields}>
                    <InputField
                      className={styles.quantityField}
                      inputClassName={styles.input}
                      register={register}
                      label="Quantity"
                      name={`${fieldName}.quantity` as "ingredients.0.quantity"}
                      errors={errors}
                      onKeyDown={highlightNextIngredient}
                    />
                    <InputField
                      className={styles.unitField}
                      inputClassName={styles.input}
                      register={register}
                      label="Unit"
                      name={`${fieldName}.unit` as "ingredients.0.unit"}
                      errors={errors}
                      onKeyDown={highlightNextIngredient}
                    />
                    <InputField
                      inputClassName={styles.input}
                      className={styles.ingredientField}
                      register={register}
                      list={DEFAULT_INGREDIENT_SELECTOR_ID}
                      label="Ingredient"
                      name={
                        `${fieldName}.ingredient` as "ingredients.0.ingredient"
                      }
                      errors={errors}
                      onKeyDown={highlightNextIngredient}
                    />
                    <InputField
                      inputClassName={styles.input}
                      className={styles.noteField}
                      register={register}
                      label="Note"
                      name={`${fieldName}.note` as "ingredients.0.note"}
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
                    <button
                      type="button"
                      onClick={() => insert(index, {} as RecipeFormIngredient)}
                    >
                      +
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
            onClick={() => append({} as RecipeFormIngredient)}
          >
            Add Ingredient
          </button>
          <button
            onClick={() => {
              setImportMode(true);
            }}
          >
            Import
          </button>
        </>
      )}
    </FieldWrapper>
  );
}
