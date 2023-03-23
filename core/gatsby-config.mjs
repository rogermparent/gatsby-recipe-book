import path from "path";
import url from "url";

export const corePath = url.fileURLToPath(new URL(".", import.meta.url));

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
          name: "recipes",
          path: path.join(corePath, "..", "content", "recipes"),
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
