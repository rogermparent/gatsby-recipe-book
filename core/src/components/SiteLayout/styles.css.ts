import { globalStyle } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("body, html", { padding: 0, margin: 0 });

export const wrapper = sprinkles({});

export const mainHeading = sprinkles({
  margin: 0,
  padding: 2,
  width: "full",
  display: "block",
  fontWeight: "bold",
  fontSize: "3xl",
});

export const header = sprinkles({ borderBottom: "default" });

export const main = sprinkles({});

export const homeLink = sprinkles({
  padding: 1,
  display: "inline-block",
});
