import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { RecipeList } from "core/src/components/Recipe/List";

export const query = graphql`
  query CuisinePage($cuisine: String!) {
    allCuisineLink(filter: { cuisine: { eq: $cuisine } }) {
      nodes {
        parent {
          ...RecipeListItem
        }
      }
    }
  }
`;

interface CuisineContext {
  cuisine: string;
}

const CuisinePage: React.FC<
  PageProps<Queries.CuisinePageQuery, CuisineContext>
> = ({ data, pageContext: { cuisine } }) => {
  if (data) {
    return (
      <SiteLayout>
        <h2>Recipes with cuisine: {cuisine}</h2>
        <RecipeList
          recipes={data.allCuisineLink.nodes.map(
            ({ parent }) => parent as Queries.RecipeListItemFragment
          )}
        />
      </SiteLayout>
    );
  }
  return null;
};

export default CuisinePage;

export const Head: HeadFC<Queries.CuisinePageQuery, CuisineContext> = ({
  pageContext: { cuisine },
}) => {
  return <title>{cuisine}</title>;
};
