import { createGlobalTheme } from "@vanilla-extract/css";
import { colors } from "./colors.css";

const fonts = {
  body: "sans-serif",
  heading: "serif",
};

export const vars = createGlobalTheme(":root", {
  colors,
  fonts,
});
