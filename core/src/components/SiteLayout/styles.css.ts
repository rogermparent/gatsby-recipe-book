import { globalStyle, style } from "@vanilla-extract/css";
import { colors, sprinkles } from "../../styles/sprinkles.css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("body, html", { padding: 0, margin: 0 });

globalStyle("a", {
  color: colors.cyan,
});

globalStyle("a:visited", {
  color: colors.blue,
});

globalStyle("a:hover", {
  color: colors.green,
});

export const wrapper = sprinkles({
  height: "full",
  minHeight: { default: "screen", print: "fit" },
  color: { lightMode: "bodyLight", darkMode: "bodyDark", print: "black" },
  background: { lightMode: "backgroundLight", darkMode: "backgroundDark" },
});

export const primaryNav = sprinkles({
  textAlign: ["center", "left"],
});

export const mainHeading = sprinkles({
  display: "block",
  margin: 0,
  padding: 2,
  width: "full",
  fontWeight: "bold",
  fontSize: "3xl",
  textAlign: ["center", "left"],
});

export const header = sprinkles({
  display: { default: "block", print: "none" },
  borderBottom: "default",
  fontFamily: "sans",
});

export const main = sprinkles({});

export const homeLink = sprinkles({
  padding: 2,
  fontWeight: "bold",
  display: "inline-block",
});
