import { RecipeFormValues } from "core/src/components/Recipe/Form";

type FormLeafValue = string | number | FileList;
type FormObjectValue = Record<string, FormLeafValue>;
type SingleFormValue = FormLeafValue | FormObjectValue;
type FormValue = SingleFormValue | SingleFormValue[];

const handleEntry: (
  formData: FormData,
  entry: [string, FormValue],
  currentPath?: string
) => void = (formData, [key, value], currentPath) => {
  if (value) {
    const newPath = currentPath ? `${currentPath}.${key}` : key;
    if (value instanceof FileList) {
      const file = value[0];
      if (file) {
        formData.append(newPath, file);
      }
    } else if (typeof value === "object" && !(value instanceof String)) {
      for (const entry of Object.entries(value)) {
        handleEntry(formData, entry, newPath);
      }
    } else {
      formData.append(newPath, String(value));
    }
  }
};

export const buildFormData = (data: RecipeFormValues): FormData => {
  const formData = new FormData();
  const entries = Object.entries(data);

  for (const entry of entries) {
    handleEntry(formData, entry);
  }

  return formData;
};
