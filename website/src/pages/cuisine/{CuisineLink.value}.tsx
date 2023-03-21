import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { RecipeList } from "core/src/components/Recipe/List";

export const query = graphql`
  query CuisinePage($value: String!) {
    allCuisineLink(filter: { value: { eq: $value } }) {
      nodes {
        parent {
          ...RecipeListItem
        }
      }
    }
  }
`;

interface CuisineContext {
  value: string;
}

const CuisinePage: React.FC<
  PageProps<Queries.CuisinePageQuery, CuisineContext>
> = ({ data, pageContext: { value } }) => {
  if (data) {
    return (
      <SiteLayout>
        <h2>Recipes with cuisine: {value}</h2>
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
  pageContext: { value: cuisine },
}) => {
  return <title>{cuisine}</title>;
};
