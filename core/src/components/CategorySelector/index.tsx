import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { MultiSelectorDataList, ValueGroup } from "../MultiSelector";

export const DEFAULT_CATEGORY_SELECTOR_ID = "recipe-category-selector";

export const CategorySelectorDataList = ({
  id = DEFAULT_CATEGORY_SELECTOR_ID,
}: {
  id?: string;
}) => {
  const data = useStaticQuery(graphql`
    query CategoriesSelector {
      categories: allCategoryLink {
        group(field: { slug: SELECT }, limit: 1) {
          value: fieldValue
          usageCount: totalCount
        }
      }
    }
  `);

  const items: ValueGroup[] | null = data?.categories?.group;

  return <MultiSelectorDataList items={items} id={id} />;
};
