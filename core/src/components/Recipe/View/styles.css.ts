import { style } from "@vanilla-extract/css";

export const infoCards = style({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "center",
  alignItems: "center",
});
export const infoCard = style({
  padding: "0.2rem",
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});
export const multiplierInput = style({
  width: "4rem",
});
