import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { GroupList, RecipeGroup } from "core/src/components/GroupList";

export const query = graphql`
  query CuisineIndex {
    allCuisineLink {
      group(field: { value: SELECT }, limit: 1) {
        totalCount
        fieldValue
        nodes {
          gatsbyPath(filePath: "/cuisine/{CuisineLink.value}")
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
      <h2>Cuisines</h2>
      <GroupList group={data?.allCuisineLink?.group as RecipeGroup[]} />
    </SiteLayout>
  );
};

export default CuisineIndex;

export const Head: HeadFC<Queries.CuisineIndexQuery> = () => {
  return <title>Cuisines</title>;
};
