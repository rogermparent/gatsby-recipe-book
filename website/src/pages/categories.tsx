import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { GroupList, RecipeGroup } from "core/src/components/GroupList";
import PageTitle from "core/src/components/PageTitle";
import { Metadata } from "core/src/components/Metadata";

export const query = graphql`
  query CategoryIndex {
    allCategoryLink {
      group(field: { slug: SELECT }, limit: 1) {
        totalCount
        fieldValue
        nodes {
          value
          gatsbyPath(filePath: "/category/{CategoryLink.slug}")
        }
      }
    }
  }
`;

const CategoryIndex: React.FC<PageProps<Queries.CategoryIndexQuery>> = ({
  data,
}) => {
  return (
    <SiteLayout>
      <PageTitle>Categories</PageTitle>
      <GroupList group={data?.allCategoryLink?.group as RecipeGroup[]} />
    </SiteLayout>
  );
};

export default CategoryIndex;

export const Head: HeadFC<Queries.CategoryIndexQuery> = () => (
  <Metadata title="Categories" />
);
