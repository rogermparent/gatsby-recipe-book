import React, { KeyboardEventHandler, ReactNode } from "react";
import {
  Control,
  FieldArrayPath,
  FieldErrors,
  FieldPath,
  UseFormRegister,
} from "react-hook-form";
import { RecipeFormValues } from "../../Recipe/Form";

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
      <div>
        {label && <div>{label}</div>}
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
  register,
  name,
  required,
  errors,
  type,
  list,
  onKeyDown,
  className,
  inputClassName,
}: FieldProps & {
  className?: string;
  inputClassName?: string;
  type?: string;
  list?: string;
  onKeyDown?: KeyboardEventHandler;
}) {
  return (
    <FieldWrapper
      name={name}
      label={label}
      errors={errors}
      className={className}
    >
      <input
        className={inputClassName}
        type={type}
        id={name}
        list={list}
        onKeyDown={onKeyDown}
        {...register(name, { required })}
      />
    </FieldWrapper>
  );
}
