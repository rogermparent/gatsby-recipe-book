import path from "path";
import type { GatsbyConfig } from "gatsby";

const rootPath = path.resolve(__dirname, "..");

const config: () => GatsbyConfig = () => ({
  siteMetadata: {
    title: `Dual Builder Stack Proof-of-Concept`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: path.join(__dirname, "src", "images", "icon.png"),
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: path.join(rootPath, "content", "posts"),
      },
      __key: "posts",
    },
    {
      resolve: "gatsby-transformer-json",
    },
  ],
});
export default config;
