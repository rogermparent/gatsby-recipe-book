import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { Recipe } from "core/src/components/Recipe";
import { Metadata } from "core/src/components/Metadata";

export const query = graphql`
  query RecipePage($id: String!) {
    recipe(id: { eq: $id }) {
      ...RecipeDisplayData
    }
  }

  fragment RecipeDisplayData on Recipe {
    name
    image {
      childImageSharp {
        gatsbyImageData(
          width: 600
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
    author {
      ...RecipeAuthorDisplayData
    }
    datePublished
    description
    prepTime: prepTimeString
    cookTime: cookTimeString
    totalTime: totalTimeString
    keywords
    servings
    servingSize
    category
    cuisine
    nutrition {
      ...RecipeNutritionDisplayData
    }
    ingredients {
      ...RecipeIngredientDisplayData
    }
    instructions {
      ...RecipeInstructionDisplayData
    }
  }

  fragment RecipeAuthorDisplayData on RecipeAuthor {
    name
  }

  fragment RecipeIngredientDisplayData on RecipeIngredient {
    unit
    quantity
    ingredient
    note
  }

  fragment RecipeInstructionDisplayData on RecipeInstruction {
    name
    text
  }

  fragment RecipeNutritionDisplayData on RecipeNutrition {
    calories
  }
`;

const RecipePage: React.FC<PageProps<Queries.RecipePageQuery>> = ({
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
      image,
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
          image={image}
        />
      </SiteLayout>
    );
  }
  return null;
};

export default RecipePage;

export const Head: HeadFC<Queries.RecipePageQuery> = ({ data: { recipe } }) => (
  <Metadata title={recipe?.name} />
);
