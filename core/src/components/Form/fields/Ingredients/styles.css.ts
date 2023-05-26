import { style } from "@vanilla-extract/css";

export const listItem = style({
  margin: "0.25rem 0",
});

export const fields = style({
  display: "flex",
  flexFlow: "row wrap",
});

export const quantityField = style({
  flex: "1 1",
  minWidth: "3rem",
});

export const unitField = style({
  flex: "1 1",
  minWidth: "3rem",
});

export const ingredientField = style({
  flex: "3 1",
  minWidth: "8rem",
});

export const noteField = style({
  flex: "3 1",
  minWidth: "8rem",
});

export const input = style({
  width: "100%",
});
