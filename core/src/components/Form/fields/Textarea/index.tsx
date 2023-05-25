import React from "react";
import { FieldProps, FieldWrapper } from "../../Input";

export function TextareaField({ label, register, name, errors }: FieldProps) {
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <textarea id={name} {...register(name)} />
    </FieldWrapper>
  );
}
