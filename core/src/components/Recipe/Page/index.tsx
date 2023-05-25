import React from "react";
import { Link, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { Recipe } from "core/src/components/Recipe";

export const RecipePage: React.FC<PageProps<Queries.RecipePageQuery>> = ({
  data: { recipe },
}) => {
  if (recipe) {
    const {
      name,
      author,
      datePublished,
      description,
      prepTime,
      cookTime,
      totalTime,
      keywords,
      servings,
      servingSize,
      category,
      cuisine,
      nutrition,
      ingredients,
      instructions,
    } = recipe;
    return (
      <SiteLayout>
        <Recipe
          name={name}
          author={author}
          datePublished={datePublished}
          description={description}
          prepTime={prepTime}
          cookTime={cookTime}
          totalTime={totalTime}
          keywords={keywords}
          servings={servings}
          servingSize={servingSize}
          category={category}
          cuisine={cuisine}
          nutrition={nutrition}
          ingredients={ingredients}
          instructions={instructions}
        />
        <Link to="edit">Edit</Link>
      </SiteLayout>
    );
  }
  return null;
};
