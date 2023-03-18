import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";

export const query = graphql`
  query RecipesIndex {
    allRecipe(sort: { datePublished: DESC }) {
      nodes {
        slug
        ...RecipeData
      }
    }
  }
`;

const IndexPage: React.FC<PageProps<Queries.RecipesIndexQuery>> = ({
  data,
}) => {
  console.log(data);
  return (
    <SiteLayout>
      <h2>Recipes</h2>
    </SiteLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
