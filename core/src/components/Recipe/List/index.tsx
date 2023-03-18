import React from "react";
import { Link } from "gatsby";

interface RecipeItem {
  slug: string;
  name: string;
  publishDate?: string;
}

export function RecipeListItem({ slug, name, publishDate }: RecipeItem) {
  return (
    <li>
      <div>{publishDate}</div>
      <h3>
        <Link to={`/recipe/${slug}`}>{name}</Link>
      </h3>
    </li>
  );
}

export function RecipeList({ recipes }: { recipes: readonly RecipeItem[] }) {
  return (
    <ul>
      {recipes.map(({ slug, name, publishDate }) => (
        <RecipeListItem
          key={slug}
          slug={slug}
          name={name}
          publishDate={publishDate}
        />
      ))}
    </ul>
  );
}
