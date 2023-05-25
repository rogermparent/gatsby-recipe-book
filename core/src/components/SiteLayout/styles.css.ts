import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("body, html", { padding: 0, margin: 0 });

export const header = style({
  fontFamily: "sans-serif",
  textAlign: "center",
  fontSize: "1.25rem",
  fontWeight: "bold",
  padding: "0.2rem",
});

export const nav = style({
  fontFamily: "sans-serif",
  textAlign: "center",
  position: "sticky",
  top: 0,
  left: 0,
  zIndex: 2,
  backgroundColor: "white",
  borderBottom: "1px solid black",
  overflow: "auto",
  boxSizing: "border-box",
});

export const navLink = style({
  display: "inline-block",
  padding: "0.25rem",
});
