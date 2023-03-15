import React, { ReactNode } from "react";
import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  Merge,
  useForm,
  UseFormRegisterReturn,
} from "react-hook-form";
import { PostInput } from "../../types";

export function FieldWrapper({
  name,
  label,
  errors,
  children,
}: {
  name: string;
  errors?:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<PostInput>>
    | undefined;
  label?: string;
  children?: ReactNode;
}) {
  return (
    <label htmlFor={name}>
      {errors && (
        <div>
          {errors.message ? errors.message.toString() : errors.type?.toString()}
        </div>
      )}
      {label && <div>{label}</div>}
      {children}
    </label>
  );
}

export function InputField({
  label,
  registration,
  errors,
  type,
}: {
  label?: string;
  registration: UseFormRegisterReturn;
  errors: FieldErrors;
  type?: string;
}) {
  const { name } = registration;
  const fieldErrors = errors[name];
  return (
    <FieldWrapper name={name} label={label} errors={fieldErrors}>
      <input type={type} id={name} {...registration} />
    </FieldWrapper>
  );
}

export function TextareaField({
  label,
  registration,
  errors,
}: {
  label?: string;
  registration: UseFormRegisterReturn;
  errors: FieldErrors;
  type?: string;
}) {
  const { name } = registration;
  const fieldErrors = errors[name];
  return (
    <FieldWrapper name={name} label={label} errors={fieldErrors}>
      <textarea id={name} {...registration} />
    </FieldWrapper>
  );
}

export interface PostData {
  title: string;
  content?: string;
}

export const PostForm: React.FC<{
  defaultValues?: PostData;
  onSubmit: (data: PostData) => void;
  submitText: string;
}> = ({ defaultValues, onSubmit, submitText }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Title"
        errors={errors}
        registration={register("title", { required: true })}
      />
      <TextareaField
        label="Content"
        errors={errors}
        registration={register("content")}
        type="text"
      />

      <div>
        <button type="submit">{submitText}</button>
      </div>
    </form>
  );
};
