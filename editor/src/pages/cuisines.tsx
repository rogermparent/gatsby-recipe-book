import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { GroupList, RecipeGroup } from "core/src/components/GroupList";
import PageTitle from "core/src/components/PageTitle";

export const query = graphql`
  query CuisineIndex {
    allCuisineLink {
      group(field: { slug: SELECT }, limit: 1) {
        totalCount
        fieldValue
        nodes {
          value
          gatsbyPath(filePath: "/cuisine/{CuisineLink.slug}")
        }
      }
    }
  }
`;

const CuisineIndex: React.FC<PageProps<Queries.CuisineIndexQuery>> = ({
  data,
}) => {
  return (
    <SiteLayout>
      <PageTitle>Cuisines</PageTitle>
      <GroupList group={data?.allCuisineLink?.group as RecipeGroup[]} />
    </SiteLayout>
  );
};

export default CuisineIndex;

export const Head: HeadFC<Queries.CuisineIndexQuery> = () => {
  return <title>Cuisines</title>;
};
