import React, { Fragment, useState } from "react";
import { graphql, HeadFC, Link, PageProps, useStaticQuery } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { Metadata } from "core/src/components/Metadata";
import { useFlexSearch } from "react-use-flexsearch";

const BoldMatches = ({ splitInput }: { splitInput: string[] }) =>
  splitInput.map((text, i) =>
    i % 2 === 0 ? <Fragment key={i}>{text}</Fragment> : <b key={i}>{text}</b>
  );

const RecipeSearchPage: React.FC<PageProps<Queries.RecipePageQuery>> = () => {
  const indexQuery = useStaticQuery(graphql`
    query SearchIndex {
      localSearchRecipes {
        index
        store
      }
    }
  `);
  const { index, store } = indexQuery.localSearchRecipes;
  const [query, setQuery] = useState<string>("");
  const results = useFlexSearch(query, index, store) as {
    id: string;
    slug: string;
    name: string;
    ingredients: string[];
  }[];
  const queryMatchRegex = new RegExp(`(${query})`, "i");
  return (
    <SiteLayout>
      <div>
        <h1>Search</h1>
        <input onChange={(e) => setQuery(e.target.value)} />
        {results.map((item) => {
          const { id, slug, name, ingredients } = item;
          const splitName = name.split(queryMatchRegex);
          return (
            <div key={id}>
              <Link to={`/recipe/view/${slug}`}>
                <BoldMatches splitInput={splitName} />
              </Link>
              <ul>
                {ingredients.map((ingredient, ingredientIndex) => {
                  const splitIngredient = ingredient.split(queryMatchRegex);
                  return splitIngredient.length > 1 ? (
                    <li key={ingredientIndex}>
                      <BoldMatches splitInput={splitIngredient} />
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </SiteLayout>
  );
};

export default RecipeSearchPage;

export const Head: HeadFC<Queries.RecipePageQuery> = ({ data: { recipe } }) => (
  <Metadata title={recipe?.name} />
);
