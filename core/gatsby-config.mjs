import path from "path";
import url from "url";
import { getContentDirectory } from "./getContentDirectory.mjs";

export const corePath = url.fileURLToPath(new URL(".", import.meta.url));

const contentDirectory = getContentDirectory();

const config = () => {
  return {
    trailingSlash: "never",
    siteMetadata: {
      title: "Recipe Book",
      siteUrl: "https://www.yourdomain.tld",
    },
    graphqlTypegen: true,
    plugins: [
      "gatsby-plugin-vanilla-extract",
      "gatsby-plugin-image",
      "gatsby-plugin-sitemap",
      {
        resolve: "gatsby-plugin-manifest",
        options: {
          icon: path.resolve(corePath, "src", "images", "icon.png"),
        },
      },
      "gatsby-plugin-sharp",
      "gatsby-transformer-sharp",
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "uploads",
          path: path.resolve(contentDirectory, "uploads"),
          ignore: [`**/.*`],
        },
        __key: "uploads",
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "recipes",
          path: path.resolve(contentDirectory, "recipes"),
          ignore: [`**/.*`],
        },
        __key: "recipes",
      },
      {
        resolve: "gatsby-transformer-json",
      },
    ],
  };
};
export default config;
