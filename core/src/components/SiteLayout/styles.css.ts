import { globalStyle } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("body, html", { padding: 0, margin: 0 });

export const wrapper = sprinkles({
  color: { lightMode: "primaryLight", darkMode: "primaryDark" },
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
  color: { darkMode: "primaryDark", lightMode: "primaryLight" },
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
  color: { darkMode: "primaryDark", lightMode: "primaryLight" },
});
