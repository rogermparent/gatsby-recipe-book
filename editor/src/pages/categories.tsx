import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { GroupList, RecipeGroup } from "core/src/components/GroupList";

export const query = graphql`
  query CategoryIndex {
    allCategoryLink {
      group(field: { category: SELECT }, limit: 1) {
        totalCount
        fieldValue
        nodes {
          gatsbyPath(filePath: "/category/{CategoryLink.category}")
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
      <h2>Categories</h2>
      <GroupList group={data?.allCategoryLink?.group as RecipeGroup[]} />
    </SiteLayout>
  );
};

export default CategoryIndex;

export const Head: HeadFC<Queries.CategoryIndexQuery> = () => {
  return <title>Categories</title>;
};
