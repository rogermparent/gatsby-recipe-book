import {
  createGlobalTheme,
  globalStyle,
  assignVars,
} from "@vanilla-extract/css";
import { colors, lightMode } from "./colors.css";

const fonts = {
  body: "sans-serif",
  heading: "serif",
};

export const restVars = createGlobalTheme(":root", {
  fonts,
});

export const colorVars = createGlobalTheme(":root", {
  colors,
});

export const vars = {
  ...restVars,
  ...colorVars,
};

globalStyle(":root", {
  "@media": {
    "(prefers-color-scheme: light)": {
      vars: assignVars(colorVars, { colors: lightMode }),
    },
  },
});
