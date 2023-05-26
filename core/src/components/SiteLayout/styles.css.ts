import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";
const { fonts, colors } = vars;

globalStyle("*", {
  padding: 0,
  margin: 0,
  boxSizing: "border-box",
});

globalStyle("body", {
  fontFamily: fonts.body,
  color: colors.body,
  backgroundColor: colors.background,
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  margin: "0.5rem 0",
  fontFamily: fonts.heading,
  fontWeight: "900",
});

globalStyle("a", {
  color: colors.link,
});

globalStyle("a:visited", {
  color: colors.link_visited,
});

globalStyle("a:hover", {
  color: colors.link_hover,
});

globalStyle("ul, ol", {
  paddingLeft: "1.5rem",
});

export const main = style({
  maxWidth: "1045px",
  margin: "0 auto",
  padding: "0.5rem",
});
