import * as React from "react";
import { graphql, HeadFC, Link, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";

export const query = graphql`
  query IngredientPage($ingredient: String!) {
    ingredient: ingredientLink(ingredient: { eq: $ingredient }) {
      ...IngredientLinkPageFields
    }
    recipes: allIngredientLink(filter: { ingredient: { eq: $ingredient } }) {
      nodes {
        parent {
          ...RecipeListItem
        }
      }
    }
  }

  fragment IngredientLinkPageFields on IngredientLink {
    ingredient
  }
`;

const IngredientPage: React.FC<PageProps<Queries.IngredientPageQuery>> = ({
  data,
}) => {
  const { ingredient, recipes } = data;
  if (data) {
    return (
      <SiteLayout>
        {ingredient && <h2>{ingredient.ingredient}</h2>}
        {recipes.nodes.length > 0 && (
          <div>
            <h3>Recipes that use this ingredient</h3>
            <ul>
              {recipes.nodes.map(({ parent }) => {
                if (parent) {
                  const { name, pagePath } = parent as {
                    name: string;
                    pagePath: string;
                  };
                  return (
                    <li key={pagePath}>
                      <Link to={pagePath}>{name}</Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        )}
        <div></div>
      </SiteLayout>
    );
  }
  return null;
};

export default IngredientPage;

export const Head: HeadFC<Queries.IngredientPageQuery> = ({
  data: { ingredient },
}) => {
  return <title>{ingredient?.ingredient}</title>;
};
