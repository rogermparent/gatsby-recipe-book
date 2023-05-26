import React from "react";
import { FieldProps, FieldWrapper } from "../../Input";
import * as styles from "./styles.css";

export function TextareaField({ label, register, name, errors }: FieldProps) {
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <textarea className={styles.textarea} id={name} {...register(name)} />
    </FieldWrapper>
  );
}
