import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { RecipeListItem } from "core/src/components/Recipe/List";
import PageTitle from "core/src/components/PageTitle";

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
        {data.allIngredientLink.nodes.map(({ parent }) => {
          const { pagePath, datePublished, name } =
            parent as Queries.RecipeListItemFragment;
          return (
            <div key={pagePath}>
              <RecipeListItem
                name={name}
                pagePath={pagePath}
                datePublished={datePublished}
              />
            </div>
          );
        })}
      </SiteLayout>
    );
  }
  return null;
};

export default IngredientPage;

export const Head: HeadFC<Queries.IngredientPageQuery> = ({ data }) => {
  return <title>{data?.ingredientLink?.ingredientName}</title>;
};
