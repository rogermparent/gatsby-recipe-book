import React from "react";
import { Link } from "gatsby";

export interface RecipeGroup {
  fieldValue: string;
  totalCount: number;
  nodes: [{ gatsbyPath: string }];
}

export const GroupList = ({ group }: { group: readonly RecipeGroup[] }) => {
  return (
    <ul>
      {group.map(({ totalCount, fieldValue, nodes: [{ gatsbyPath }] }) => (
        <li key={fieldValue}>
          <Link to={gatsbyPath as string}>
            {fieldValue} ({totalCount})
          </Link>
        </li>
      ))}
    </ul>
  );
};
