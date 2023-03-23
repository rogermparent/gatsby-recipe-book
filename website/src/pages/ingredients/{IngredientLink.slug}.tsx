import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { RecipeList } from "core/src/components/Recipe/List";

export const query = graphql`
  query IngredientPage($slug: String!) {
    allIngredientLink(filter: { slug: { eq: $slug } }) {
      nodes {
        parent {
          ...RecipeListItem
        }
      }
    }
  }
`;

interface IngredientContext {
  slug: string;
}

const IngredientPage: React.FC<
  PageProps<Queries.IngredientPageQuery, IngredientContext>
> = ({ data, pageContext: { slug } }) => {
  if (data) {
    return (
      <SiteLayout>
        <h2>Recipes with ingredient: {slug}</h2>
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
  pageContext: { slug: ingredient },
}) => {
  return <title>{ingredient}</title>;
};
