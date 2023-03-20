import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { RecipeList } from "core/src/components/Recipe/List";

export const query = graphql`
  query IngredientPage($value: String!) {
    allIngredientLink(filter: { value: { eq: $value } }) {
      nodes {
        parent {
          ...RecipeListItem
        }
      }
    }
  }
`;

interface IngredientContext {
  value: string;
}

const IngredientPage: React.FC<
  PageProps<Queries.IngredientPageQuery, IngredientContext>
> = ({ data, pageContext: { value } }) => {
  if (data) {
    return (
      <SiteLayout>
        <h2>Recipes with ingredient: {value}</h2>
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

export const Head: HeadFC<Queries.IngredientPageQuery, IngredientContext> = ({
  pageContext: { value: ingredient },
}) => {
  return <title>{ingredient}</title>;
};
