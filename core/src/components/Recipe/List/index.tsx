import React from "react";
import { Link } from "gatsby";

export function RecipeListItem({
  pagePath,
  name,
  datePublished,
}: Queries.RecipeListItemFragment) {
  return (
    <li>
      <div>
        <Link to={pagePath as string}>
          <div>{name}</div>
        </Link>
        {datePublished && <div>{datePublished}</div>}
      </div>
    </li>
  );
}

export function RecipeList({
  recipes,
}: {
  recipes: readonly Queries.RecipeListItemFragment[];
}) {
  return recipes?.length ? (
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
  ) : (
    <p>There are no recipes</p>
  );
}
