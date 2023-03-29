import React from "react";
import { Link } from "gatsby";
import * as styles from "./styles.css";

export interface RecipeGroup {
  totalCount: number;
  nodes: [{ gatsbyPath: string; value: string }];
}

export const GroupList = ({ group }: { group: readonly RecipeGroup[] }) => {
  return (
    <ul className={styles.list}>
      {group.map(({ totalCount, nodes: [{ gatsbyPath, value }] }) => (
        <li key={value} className={styles.item}>
          <Link to={gatsbyPath as string} className={styles.itemLink}>
            {value} ({totalCount})
          </Link>
        </li>
      ))}
    </ul>
  );
};
