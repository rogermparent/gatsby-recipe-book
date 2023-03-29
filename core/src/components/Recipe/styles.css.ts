import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";

export const container = sprinkles({
  maxWidth: "2xl",
  marginX: "auto",
});

export const title = sprinkles({
  fontFamily: "sans",
  padding: 0,
  margin: 2,
  fontSize: ["2xl", "3xl"],
});

export const ingredientsHeading = sprinkles({
  fontFamily: "sans",
  padding: 0,
  margin: 2,
  fontSize: ["xl", "2xl"],
});

export const instructionsHeading = sprinkles({
  fontFamily: "sans",
  padding: 0,
  margin: 2,
  fontSize: ["xl", "2xl"],
});

export const infoCards = sprinkles({
  fontFamily: "sans",
  textAlign: "center",
  width: "fit",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  backgroundColor: {
    lightMode: "altBackgroundLight",
    darkMode: "altBackgroundDark",
  },
  marginX: "auto",
  fontSize: "sm",
  alignItems: "center",
  justifyContent: "center",
});

export const infoCardGroup = sprinkles({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
});

export const infoCardWrapper = sprinkles({
  padding: 1,
});

export const infoCard = sprinkles({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
});

export const infoCardTitle = sprinkles({ fontWeight: "bold" });

export const infoCardBody = sprinkles({});

export const multiplyInput = sprinkles({
  width: 14,
  fontWeight: "body",
  marginTop: 0.5,
});

export const multiplier = sprinkles({
  fontSize: "sm",
  padding: 1,
  display: { print: "none" },
  fontWeight: "semibold",
});

export const description = sprinkles({ margin: 2, fontSize: "sm" });

export const ingredientsSection = sprinkles({
  flexShrink: 0,
});

export const ingredientsList = sprinkles({
  padding: 1,
  paddingLeft: 2,
  marginY: 1,
  listStyle: "none",
});
export const instructionsList = sprinkles({
  padding: 1,
  marginY: 1,
  paddingLeft: 8,
});

export const ingredientsListItem = sprinkles({
  paddingY: { default: 1, print: 0 },
});
export const instructionsListItem = sprinkles({
  paddingY: { default: 1, print: 0.5 },
});

export const ingredientsAndInstructions = sprinkles({
  display: "flex",
  flexDirection: {
    default: "column",
  },
  flexWrap: "nowrap",
});

export const primaryImage = sprinkles({
  marginX: "auto",
  maxWidth: "xl",
  display: { default: "block", print: "none" },
});
