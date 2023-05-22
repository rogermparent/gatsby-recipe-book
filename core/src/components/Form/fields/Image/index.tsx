import React, { useState } from "react";
import * as styles from "../../styles.css";
import { UseFormSetValue } from "react-hook-form";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FieldProps, FieldWrapper } from "../../Input";
import { RecipeFormValues } from "../../../Recipe/Form";

export function ImageField({
  label,
  register,
  name,
  errors,
  originalData,
  isDirty,
  setValue,
}: FieldProps & {
  originalData?: Queries.RecipeImageEditorDataFragment | null;
  isDirty: boolean | undefined;
  setValue: UseFormSetValue<RecipeFormValues>;
}): JSX.Element {
  const [imagePreviewURL, setImagePreviewURL] = useState<string | undefined>();
  const imageData =
    originalData?.childImageSharp && getImage(originalData.childImageSharp);
  return (
    <FieldWrapper label={label} errors={errors} name={name}>
      {imagePreviewURL ? (
        <div className={styles.editorImageContainer}>
          <img src={imagePreviewURL} className={styles.editorPreviewImage} />
        </div>
      ) : !isDirty && imageData ? (
        <div className={styles.editorImageContainer}>
          <GatsbyImage
            image={imageData}
            alt=""
            className={styles.defaultEditorPreviewImage}
          />
        </div>
      ) : null}
      <input
        type="file"
        {...register(name, {
          onChange: (e) => {
            const newFile = e.target.files[0];
            if (newFile) {
              const oldPreviewURL = imagePreviewURL;
              setImagePreviewURL(URL.createObjectURL(newFile));
              if (oldPreviewURL) {
                URL.revokeObjectURL(oldPreviewURL);
              }
            }
          },
        })}
      />
      <button
        type="button"
        onClick={() => {
          setValue(name, null);
          setImagePreviewURL(undefined);
        }}
      >
        Clear
      </button>
    </FieldWrapper>
  );
}
