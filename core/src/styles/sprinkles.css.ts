import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import { tailwind } from "@theme-ui/presets";

const borders = {
  default: "1px solid",
};

const tailwindSpacing = {
  px: "1px",
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
  40: "10rem",
  48: "12rem",
  56: "14rem",
  64: "16rem",
};

const tailwindMaxWidth = {
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  prose: "65ch",
};

const tailwindMinWidth = {
  0: "0px",
  full: "100%",
  min: "min-content",
  max: "max-content",
  fit: "fit-content",
};

const tailwindWidth = {
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666667%",
  "2/6": "33.333333%",
  "3/6": "50%",
  "4/6": "66.666667%",
  "5/6": "83.333333%",
  "1/12": "8.333333%",
  "2/12": "16.666667%",
  "3/12": "25%",
  "4/12": "33.333333%",
  "5/12": "41.666667%",
  "6/12": "50%",
  "7/12": "58.333333%",
  "8/12": "66.666667%",
  "9/12": "75%",
  "10/12": "83.333333%",
  "11/12": "91.666667%",
  full: "100%",
  screenHeight: "100vh",
  screenWidth: "100vw",
};

const responsiveProperties = defineProperties({
  conditions: {
    default: {},
    sm: { "@media": "screen and (min-width: 640px)" },
    md: { "@media": "screen and (min-width: 768px)" },
    lg: { "@media": "screen and (min-width: 1024px)" },
    xl: { "@media": "screen and (min-width: 1280px)" },
    "2xl": { "@media": "screen and (min-width: 1536px)" },
  },
  defaultCondition: "default",
  properties: {
    position: ["relative", "absolute", "sticky"],
    display: ["none", "flex", "block", "inline", "inline-block"],
    flexDirection: ["row", "column"],
    flexWrap: ["wrap", "nowrap"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-around",
      "space-between",
    ],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    width: tailwindWidth,
    height: tailwindWidth,
    minWidth: tailwindMinWidth,
    minHeight: tailwindWidth,
    maxWidth: tailwindMaxWidth,
    maxHeight: tailwindWidth,
    marginTop: tailwindSpacing,
    marginBottom: tailwindSpacing,
    marginLeft: tailwindSpacing,
    marginRight: tailwindSpacing,
    paddingTop: tailwindSpacing,
    paddingBottom: tailwindSpacing,
    paddingLeft: tailwindSpacing,
    paddingRight: tailwindSpacing,
    top: tailwindSpacing,
    bottom: tailwindSpacing,
    left: tailwindSpacing,
    right: tailwindSpacing,
    fontFamily: tailwind.fonts,
    fontSize: tailwind.fontSizes,
    fontWeight: tailwind.fontWeights,
    borderWidth: tailwind.borderWidths,
    borderTopRightRadius: tailwind.radii,
    borderBottomRightRadius: tailwind.radii,
    borderTopLeftRadius: tailwind.radii,
    borderBottomLeftRadius: tailwind.radii,
    flexGrow: [0, 1],
    flexShrink: [0, 1],
    flexBasis: tailwindSpacing,
    float: ["right", "left"],
    clear: ["right", "left"],
    textAlign: ["left", "right", "center"],
    borderTop: borders,
    borderBottom: borders,
    borderLeft: borders,
    borderRight: borders,
    listStyle: ["none"],
  },
  shorthands: {
    margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    borderRadius: [
      "borderTopRightRadius",
      "borderBottomRightRadius",
      "borderTopLeftRadius",
      "borderBottomLeftRadius",
    ],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    placeItems: ["justifyContent", "alignItems"],
    border: ["borderTop", "borderBottom", "borderLeft", "borderRight"],
  },
});

const colorProperties = defineProperties({
  conditions: {
    lightMode: {},
    darkMode: { "@media": "(prefers-color-scheme: dark)" },
  },
  defaultCondition: "lightMode",
  properties: {
    color: tailwind.colors,
    background: tailwind.colors,
    backgroundColor: tailwind.colors,
  },
});

export const sprinkles = createSprinkles(responsiveProperties, colorProperties);

// It's a good idea to export the Sprinkles type too
export type Sprinkles = Parameters<typeof sprinkles>[0];
