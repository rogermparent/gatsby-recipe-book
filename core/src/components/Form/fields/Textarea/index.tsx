import React from "react";
import { FieldProps, FieldWrapper } from "../../Input";
import * as styles from "../../styles.css";

export function TextareaField({ label, register, name, errors }: FieldProps) {
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <textarea id={name} className={styles.inputField} {...register(name)} />
    </FieldWrapper>
  );
}
