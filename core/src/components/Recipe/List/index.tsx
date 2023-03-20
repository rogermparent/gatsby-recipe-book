import React from "react";
import { Link } from "gatsby";

export function RecipeListItem({
  pagePath,
  name,
  datePublished,
}: Queries.RecipeListItemFragment) {
  return (
    <li>
      <h3>
        <Link to={pagePath}>{name}</Link>
      </h3>
      <div>{datePublished}</div>
    </li>
  );
}

export function RecipeList({
  recipes,
}: {
  recipes: readonly Queries.RecipeListItemFragment[];
}) {
  return (
    <ul>
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
