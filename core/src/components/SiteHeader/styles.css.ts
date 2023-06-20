import { style } from "@vanilla-extract/css";
import { hideOnPrint, vars } from "../../styles/theme.css";

const { colors, fonts } = vars;

export const nav = style([
  hideOnPrint,
  {
    borderBottom: "1px solid",
    position: "sticky",
    top: 0,
    backgroundColor: colors.background,
    textAlign: "center",
    zIndex: 10,
  },
]);

export const navLink = style({
  padding: "0.2rem",
  display: "inline-block",
  fontWeight: "bold",
  fontFamily: fonts.heading,
  borderColor: colors.body,
});

export const header = style([
  hideOnPrint,
  {
    textAlign: "center",
  },
]);

export const heading = style({
  padding: "0.2rem",
  fontSize: "1.5rem",
  fontWeight: "bold",
  fontFamily: fonts.heading,
});
