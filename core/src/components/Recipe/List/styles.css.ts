import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/theme.css";

export const list = style({
  margin: "0 auto",
  padding: "0.2rem",
  listStyle: "none",
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-around",
});

export const listItemWrapper = style({
  padding: "0.25rem",
  width: "100%",
  "@media": {
    "screen and (min-width: 360px)": {
      width: "50%",
    },
    "screen and (min-width: 640px)": {
      width: "33%",
    },
    "screen and (min-width: 720px)": {
      width: "25%",
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
