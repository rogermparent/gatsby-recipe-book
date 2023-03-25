import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { RecipeList } from "core/src/components/Recipe/List";

export const query = graphql`
  query CategoryPage($slug: String!) {
    categoryLink(slug: { eq: $slug }) {
      value
    }
    allCategoryLink(filter: { slug: { eq: $slug } }) {
      nodes {
        parent {
          ...RecipeListItem
        }
      }
    }
  }
`;

const CategoryPage: React.FC<PageProps<Queries.CategoryPageQuery>> = ({
  data,
}) => {
  if (data) {
    return (
      <SiteLayout>
        <h2>Recipes with category: {data?.categoryLink?.value}</h2>
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

export const Head: HeadFC<Queries.CategoryPageQuery> = ({ data }) => {
  return <title>{data?.categoryLink?.value}</title>;
};
