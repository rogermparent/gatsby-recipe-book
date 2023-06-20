import { style } from "@vanilla-extract/css";
import { hideOnPrint } from "../../../styles/theme.css";

export const infoCards = style({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "center",
  alignItems: "center",
  "@media": { print: { display: "inline-flex" } },
});
export const infoCard = style({
  padding: "0.2rem",
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});
const hideOnPrintStyle = style(hideOnPrint);
export const multiplierInfoCard = style([infoCard, hideOnPrintStyle]);
export const multiplierInput = style({
  width: "4rem",
});
export const image = hideOnPrintStyle;
export const editLink = hideOnPrintStyle;
