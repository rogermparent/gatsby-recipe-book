import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { RecipeList } from "core/src/components/Recipe/List";

export const query = graphql`
  query CategoryPage($value: String!) {
    allCategoryLink(filter: { value: { eq: $value } }) {
      nodes {
        parent {
          ...RecipeListItem
        }
      }
    }
  }
`;

interface CategoryContext {
  value: string;
}

const CategoryPage: React.FC<
  PageProps<Queries.CategoryPageQuery, CategoryContext>
> = ({ data, pageContext: { value } }) => {
  if (data) {
    return (
      <SiteLayout>
        <h2>Recipes with category: {value}</h2>
        <RecipeList
          recipes={data.allCategoryLink.nodes.map(
            ({ parent }) => parent as Queries.RecipeListItemFragment
          )}
        />
      </SiteLayout>
    );
  }
  return null;
};

export default CategoryPage;

export const Head: HeadFC<Queries.CategoryPageQuery, CategoryContext> = ({
  pageContext: { value },
}) => {
  return <title>{value}</title>;
};
