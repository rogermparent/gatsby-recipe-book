import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { RecipeList } from "core/src/components/Recipe/List";
import PageTitle from "core/src/components/PageTitle";
import { Metadata } from "core/src/components/Metadata";

export const query = graphql`
  query CuisinePage($slug: String!) {
    cuisineLink(slug: { eq: $slug }) {
      value
    }
    allCuisineLink(filter: { slug: { eq: $slug } }) {
      nodes {
        parent {
          ...RecipeListItem
        }
      }
    }
  }
`;

interface CuisineContext {
  slug: string;
}

const CuisinePage: React.FC<
  PageProps<Queries.CuisinePageQuery, CuisineContext>
> = ({ data }) => {
  if (data) {
    return (
      <SiteLayout>
        <PageTitle>Recipes with cuisine: {data?.cuisineLink?.value}</PageTitle>
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
  pageContext: { slug },
}) => <Metadata title={slug} />;
