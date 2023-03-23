import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { RecipeList } from "core/src/components/Recipe/List";

export const query = graphql`
  query CategoryPage($slug: String!) {
    allCategoryLink(filter: { slug: { eq: $slug } }) {
      nodes {
        parent {
          ...RecipeListItem
        }
      }
    }
  }
`;

interface CategoryContext {
  slug: string;
}

const CategoryPage: React.FC<
  PageProps<Queries.CategoryPageQuery, CategoryContext>
> = ({ data, pageContext: { slug } }) => {
  if (data) {
    return (
      <SiteLayout>
        <h2>Recipes with category: {slug}</h2>
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
  pageContext: { slug },
}) => {
  return <title>{slug}</title>;
};
