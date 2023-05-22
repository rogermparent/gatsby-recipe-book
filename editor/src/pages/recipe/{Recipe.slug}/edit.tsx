import React from "react";
import { graphql, HeadFC, navigate, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import {
  RecipeForm,
  initializeFormState,
} from "core/src/components/Recipe/Form";
import { deleteRecipe } from "../../../calls/recipe/delete";
import { updateRecipe } from "../../../calls/recipe/update";
import PageTitle from "core/src/components/PageTitle";
import { Metadata } from "core/src/components/Metadata";
import { buildFormData, massageFormData } from "../../../calls/recipe/process";
import { waitForPageToExist } from "../../../util/wait-for-page";

export const query = graphql`
  query RecipeEdit($id: String!) {
    recipe(id: { eq: $id }) {
      slug
      pagePath: gatsbyPath(filePath: "/recipe/{Recipe.slug}")
      ...RecipeEditorData
    }
  }

  fragment RecipeEditorData on Recipe {
    name
    image {
      ...RecipeImageEditorData
    }
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

  fragment RecipeImageEditorData on File {
    base
    childImageSharp {
      gatsbyImageData(
        width: 200
        placeholder: BLURRED
        formats: [AUTO, WEBP, AVIF]
      )
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
    const { pagePath, ...recipe } = recipeData;
    const { slug } = recipeData;
    return (
      <SiteLayout>
        <PageTitle>Edit Recipe</PageTitle>
        <RecipeForm
          originalData={recipe}
          submitText="Edit Recipe"
          defaultValues={initializeFormState(recipe)}
          onSubmit={async (data) => {
            const massagedFields = massageFormData(data);
            const formData = buildFormData(massagedFields);
            await updateRecipe(formData, slug);
            const redirectURL = `/recipe/${massagedFields.slug}`;
            await waitForPageToExist(redirectURL);
            navigate(redirectURL);
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

export const Head: HeadFC = () => <Metadata title="Edit a Recipe" />;
