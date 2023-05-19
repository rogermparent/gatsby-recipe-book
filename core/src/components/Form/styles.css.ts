import { sprinkles } from "../../styles/sprinkles.css";

export const inputField = sprinkles({ width: "full" });

export const textarea = sprinkles({
  width: "full",
  height: 14,
  resize: "vertical",
  marginX: 1,
});

export const fieldLabelWrapper = sprinkles({
  padding: 1,
  display: "block",
});

export const fieldLabelHeading = sprinkles({
  fontSize: "default",
  fontFamily: "sans",
  fontWeight: "bold",
  paddingY: 1,
});

export const editorImageContainer = sprinkles({
  maxWidth: "full",
});

export const editorPreviewImage = sprinkles({
  maxWidth: "full",
});

export const defaultEditorPreviewImage = sprinkles({
  maxWidth: "full",
});

export const ingredientFields = sprinkles({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
});

export const list = sprinkles({
  paddingLeft: 4,
});
