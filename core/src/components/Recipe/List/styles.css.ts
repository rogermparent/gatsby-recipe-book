import { style } from "@vanilla-extract/css";
import { vars, screens } from "../../../styles/theme.css";

export const list = style({
  margin: "0 auto",
  padding: "0.2rem",
  listStyle: "none",
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "center",
});

export const listItemWrapper = style({
  padding: "0.25rem",
  width: "100%",
  "@media": {
    [screens.sm]: {
      width: "50%",
    },
    [screens.md]: {
      width: "33%",
    },
    [screens.lg]: {
      width: "20%",
    },
    [screens.xl]: {
      width: "16%",
    },
  },
});

export const listItem = style({
  transition: "0.2s background-color",
  overflow: "hidden",
  ":hover": {
    backgroundColor: vars.colors.backgroundAlt,
  },
  height: "100%",
  display: "flex",
  flexFlow: "column nowrap",
  borderRadius: "0.5rem",
});

export const listItemTitle = style({
  flex: "1",
  fontWeight: "bold",
  margin: "0.25rem 0.5rem",
});

export const listItemDate = style({
  margin: "0 0.5rem 0.5rem 0.5rem",
});
