import React, { useRef, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { RecipeFormInstruction, RecipeFormValues } from "../../../Recipe/Form";
import { FieldArrayProps, FieldWrapper, InputField } from "../../Input";
import * as styles from "../../styles.css";
import { TextareaField } from "../Textarea";

export function InstructionListField({
  control,
  errors,
  label,
  name,
  register,
}: FieldArrayProps & { name: "instructions" }) {
  const [importMode, setImportMode] = useState<boolean>(false);
  const { fields, remove, move, append, replace } = useFieldArray<
    RecipeFormValues,
    "instructions"
  >({ control, name });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      {importMode ? (
        <>
          <textarea className={styles.inputField} ref={textareaRef} />
          <div>
            <button
              onClick={() => {
                if (textareaRef.current) {
                  const textareaValue = textareaRef.current.value
                    .trim()
                    .split(/\n+/)
                    .map((line) => line.trim());
                  const finalInstructions: RecipeFormInstruction[] = [];
                  for (const line of textareaValue) {
                    const trimmedLine = line.trim();
                    if (trimmedLine) {
                      finalInstructions.push({ text: trimmedLine });
                    }
                  }
                  replace(finalInstructions);
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
          <ol className={styles.list}>
            {fields.map((field, index) => {
              const fieldName = `${name}.${index}`;
              return (
                <li key={field.id}>
                  <InputField
                    register={register}
                    label="Name"
                    name={`${fieldName}.name` as "instructions.0.name"}
                    errors={errors}
                  />
                  <TextareaField
                    register={register}
                    label="Text"
                    name={`${fieldName}.text` as "instructions.0.text"}
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
          </ol>
          <button
            type="button"
            onClick={() => append({} as RecipeFormInstruction)}
          >
            Add Instruction
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
