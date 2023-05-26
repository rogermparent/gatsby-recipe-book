import React from "react";
import { Link } from "gatsby";

export interface RecipeGroup {
  totalCount: number;
  nodes: [{ gatsbyPath: string; value: string }];
}

export const GroupList = ({ group }: { group: readonly RecipeGroup[] }) => {
  return (
    <ul>
      {group.map(({ totalCount, nodes: [{ gatsbyPath, value }] }) => (
        <li key={value}>
          <Link to={gatsbyPath as string}>
            {value} ({totalCount})
          </Link>
        </li>
      ))}
    </ul>
  );
};
