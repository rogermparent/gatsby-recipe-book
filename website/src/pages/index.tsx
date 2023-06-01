import React from "react";
import { graphql, HeadFC, Link, PageProps } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { RecipeList } from "core/src/components/Recipe/List";
import PageTitle from "core/src/components/PageTitle";
import { Metadata } from "core/src/components/Metadata";

export const query = graphql`
  query RecipesIndex {
    allRecipe(sort: { datePublished: DESC }) {
      nodes {
        ...RecipeListItem
      }
    }
  }

  fragment RecipeListItem on Recipe {
    image {
      childImageSharp {
        gatsbyImageData(
          width: 300
          placeholder: BLURRED
          aspectRatio: 0.8
          transformOptions: { cropFocus: CENTER }
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
    name
    pagePath
    datePublished(formatString: "YYYY-MM-DD")
  }
`;

const IndexPage: React.FC<PageProps<Queries.RecipesIndexQuery>> = ({
  data,
}) => {
  return (
    <SiteLayout>
      <PageTitle>Recipes</PageTitle>
      <Link to="/recipe/new">New Recipe</Link>
      <RecipeList recipes={data?.allRecipe?.nodes} />
    </SiteLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <Metadata title="Recipes" />;
