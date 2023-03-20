import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { GroupList, RecipeGroup } from "core/src/components/GroupList";

export const query = graphql`
  query IngredientIndex {
    allIngredientLink {
      group(field: { ingredient: SELECT }, limit: 1) {
        totalCount
        fieldValue
        nodes {
          gatsbyPath(filePath: "/ingredients/{IngredientLink.ingredient}")
        }
      }
    }
  }
`;

const IngredientIndex: React.FC<PageProps<Queries.IngredientIndexQuery>> = ({
  data,
}) => {
  return (
    <SiteLayout>
      <h2>Ingredients</h2>
      <GroupList group={data?.allIngredientLink?.group as RecipeGroup[]} />
    </SiteLayout>
  );
};

export default IngredientIndex;

export const Head: HeadFC<Queries.IngredientIndexQuery> = () => {
  return <title>Ingredients</title>;
};