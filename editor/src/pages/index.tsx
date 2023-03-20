import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { RecipeList } from "core/src/components/Recipe/List";

export const query = graphql`
  query RecipesIndex {
    allRecipe(sort: { datePublished: DESC }) {
      nodes {
        ...RecipeListItem
      }
    }
  }

  fragment RecipeListItem on Recipe {
    pagePath: gatsbyPath(filePath: "/recipe/{Recipe.slug}")
    name
    datePublished(formatString: "YYYY-MM-DD")
  }
`;

const IndexPage: React.FC<PageProps<Queries.RecipesIndexQuery>> = ({
  data,
}) => {
  return (
    <SiteLayout>
      <h2>Recipes</h2>
      <RecipeList recipes={data.allRecipe.nodes} />
    </SiteLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
