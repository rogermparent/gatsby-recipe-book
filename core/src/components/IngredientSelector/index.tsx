import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { MultiSelectorDataList, ValueGroup } from "../MultiSelector";

export const DEFAULT_INGREDIENT_SELECTOR_ID = "recipe-ingredient-selector";

export const IngredientSelectorDataList = ({
  id = DEFAULT_INGREDIENT_SELECTOR_ID,
}: {
  id?: string;
}) => {
  const data = useStaticQuery(graphql`
    query IngredientsSelector {
      ingredients: allIngredientLink {
        group(field: { value: SELECT }, limit: 1) {
          value: fieldValue
          usageCount: totalCount
        }
      }
    }
  `);

  const items: ValueGroup[] | null = data?.ingredients?.group;

  return <MultiSelectorDataList items={items} id={id} />;
};
