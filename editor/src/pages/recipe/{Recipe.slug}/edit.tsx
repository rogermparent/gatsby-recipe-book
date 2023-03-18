import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import {
  RecipeForm,
  initializeFormState,
} from "core/src/components/Recipe/Form";
import { deleteRecipe } from "../../../calls/recipe/delete";
import { updateRecipe } from "../../../calls/recipe/update";

export const query = graphql`
  query RecipeEdit($id: String!) {
    recipe(id: { eq: $id }) {
      slug
      ...RecipeEditorData
    }
  }

  fragment RecipeEditorData on Recipe {
    name
    author {
      ...RecipeAuthorEditorData
    }
    datePublished
    description
    prepTime
    cookTime
    totalTime
    keywords
    servings
    servingSize
    category
    cuisine
    nutrition {
      ...RecipeNutritionEditorData
    }
    ingredients {
      ...RecipeIngredientEditorData
    }
    instructions {
      ...RecipeInstructionEditorData
    }
  }

  fragment RecipeAuthorEditorData on RecipeAuthor {
    name
  }

  fragment RecipeIngredientEditorData on RecipeIngredient {
    unit
    quantity
    ingredient
    note
  }

  fragment RecipeInstructionEditorData on RecipeInstruction {
    name
    text
  }

  fragment RecipeNutritionEditorData on RecipeNutrition {
    calories
  }
`;

const EditPage: React.FC<PageProps<Queries.RecipeEditQuery>> = ({ data }) => {
  const { recipe: recipeData } = data;

  if (recipeData) {
    const { slug, ...recipe } = recipeData;
    return (
      <SiteLayout>
        <h2>Edit Recipe</h2>
        <RecipeForm
          submitText="Edit Recipe"
          defaultValues={initializeFormState(recipe)}
          onSubmit={(data) => {
            const { recipe } = data;
            updateRecipe(recipe, slug);
          }}
        />
        <button
          onClick={() => {
            deleteRecipe(slug);
          }}
        >
          Delete
        </button>
      </SiteLayout>
    );
  } else {
    return null;
  }
};

export default EditPage;

export const Head: HeadFC = () => <title>Edit a Recipe</title>;
