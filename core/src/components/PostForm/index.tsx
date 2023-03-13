import React, { ReactNode } from "react";
import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  Merge,
  useForm,
  UseFormRegisterReturn,
} from "react-hook-form";
import SiteLayout from "core/src/components/SiteLayout";

export const FieldWrapper = ({
  name,
  label,
  errors,
  children,
}: {
  name: string;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  label?: string;
  children?: ReactNode;
}) => {
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
};

export const StringField = ({
  label,
  registration,
  errors,
}: {
  label?: string;
  registration: UseFormRegisterReturn;
  errors: FieldErrors;
}) => {
  const { name } = registration;
  const fieldErrors = errors[name];
  return (
    <FieldWrapper name={name} label={label} errors={fieldErrors}>
      <input id={name} {...registration} />
    </FieldWrapper>
  );
};

export interface PostData {
  title: string;
  content?: string;
}

export const PostForm: React.FC<{
  defaultValues?: PostData;
  onSubmit: (data: PostData) => void;
}> = ({ defaultValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StringField
        label="Title"
        errors={errors}
        registration={register("title", { required: true })}
      />
      <StringField
        label="Content"
        errors={errors}
        registration={register("content")}
      />

      <input type="submit" />
    </form>
  );
};
