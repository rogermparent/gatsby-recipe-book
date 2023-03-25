import { sprinkles } from "../../../styles/sprinkles.css";

export const actions = sprinkles({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});

export const editLink = sprinkles({
  display: { default: "block", print: "none" },
  color: { darkMode: "primaryDark", lightMode: "primaryLight" },
  padding: 2,
  fontSize: "lg",
});
