import React from "react";
import { graphql, HeadFC, Link, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { RecipeView } from "core/src/components/Recipe/View";
import { Metadata } from "core/src/components/Metadata";
import * as styles from "./styles.css";

export const query = graphql`
  query RecipePage($id: String!) {
    recipe(id: { eq: $id }) {
      ...RecipeDisplayData
    }
  }

  fragment RecipeDisplayData on Recipe {
    slug
    name
    image {
      childImageSharp {
        gatsbyImageData(
          width: 728
          aspectRatio: 1
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
      slug,
    } = recipe;
    return (
      <SiteLayout>
        <RecipeView
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
        <div>
          <Link className={styles.editLink} to={`/recipe/edit/${slug}`}>
            Edit
          </Link>
        </div>
      </SiteLayout>
    );
  }
  return null;
};

export default RecipePage;

export const Head: HeadFC<Queries.RecipePageQuery> = ({ data: { recipe } }) => (
  <Metadata title={recipe?.name} />
);
