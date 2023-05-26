import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { RecipeList } from "core/src/components/Recipe/List";
import PageTitle from "core/src/components/PageTitle";
import { Metadata } from "core/src/components/Metadata";

export const query = graphql`
  query IngredientPage($slug: String!) {
    ingredientLink(slug: { eq: $slug }) {
      ingredientName: value
    }
    allIngredientLink(filter: { slug: { eq: $slug } }) {
      nodes {
        parent {
          ...RecipeListItem
        }
      }
    }
  }
`;

const IngredientPage: React.FC<PageProps<Queries.IngredientPageQuery>> = ({
  data,
}) => {
  if (data) {
    const ingredientName = data?.ingredientLink?.ingredientName;
    return (
      <SiteLayout>
        <PageTitle>Recipes with ingredient: {ingredientName}</PageTitle>
        <RecipeList
          recipes={data.allIngredientLink.nodes.map(
            ({ parent }) => parent as Queries.RecipeListItemFragment
          )}
        />
      </SiteLayout>
    );
  }
  return null;
};

export default IngredientPage;

export const Head: HeadFC<Queries.IngredientPageQuery> = ({ data }) => (
  <Metadata title={data?.ingredientLink?.ingredientName} />
);
