import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as styles from "./styles.css";

export function RecipeListItem({
  slug,
  name,
  datePublished,
  image,
}: Queries.RecipeListItemFragment) {
  const fetchedImage = getImage(image?.childImageSharp || null);
  return (
    <li className={styles.listItemWrapper}>
      <Link to={`/recipe/view/${slug}`} className={styles.listItem}>
        {fetchedImage && <GatsbyImage image={fetchedImage} alt="" />}
        <div className={styles.listItemTitle}>{name}</div>
        {datePublished && (
          <div className={styles.listItemDate}>{datePublished}</div>
        )}
      </Link>
    </li>
  );
}

export function RecipeList({
  recipes,
}: {
  recipes: readonly Queries.RecipeListItemFragment[];
}) {
  return recipes?.length ? (
    <ul className={styles.list}>
      {recipes.map(({ slug, name, datePublished, image }) => (
        <RecipeListItem
          key={slug}
          slug={slug}
          name={name}
          datePublished={datePublished}
          image={image}
        />
      ))}
    </ul>
  ) : (
    <p>There are no recipes</p>
  );
}
