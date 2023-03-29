import React from "react";
import { Link } from "gatsby";
import * as styles from "./styles.css";

export function RecipeListItem({
  pagePath,
  name,
  datePublished,
}: Queries.RecipeListItemFragment) {
  return (
    <li>
      <div className={styles.recipeItem}>
        <Link to={pagePath as string} className={styles.itemLink}>
          <div className={styles.heading}>{name}</div>
        </Link>
        {datePublished && <div className={styles.date}>{datePublished}</div>}
      </div>
    </li>
  );
}

export function RecipeList({
  recipes,
}: {
  recipes: readonly Queries.RecipeListItemFragment[];
}) {
  return (
    <ul className={styles.recipeList}>
      {recipes.map(({ pagePath, name, datePublished }) => (
        <RecipeListItem
          key={pagePath}
          pagePath={pagePath}
          name={name}
          datePublished={datePublished}
        />
      ))}
    </ul>
  );
}
