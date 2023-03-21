import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { MultiSelectorDataList, ValueGroup } from "../MultiSelector";

export const DEFAULT_CUISINE_SELECTOR_ID = "recipe-cuisine-selector";

export const CuisineSelectorDataList = ({
  id = DEFAULT_CUISINE_SELECTOR_ID,
}: {
  id?: string;
}) => {
  const data = useStaticQuery(graphql`
    query CuisinesSelector {
      cuisines: allCuisineLink {
        group(field: { value: SELECT }, limit: 1) {
          value: fieldValue
          usageCount: totalCount
        }
      }
    }
  `);

  const items: ValueGroup[] | null = data?.cuisines?.group;

  return <MultiSelectorDataList items={items} id={id} />;
};
