import React, { useState } from "react";
import { graphql, HeadFC, Link, PageProps, useStaticQuery } from "gatsby";
import SiteLayout from "core/src/components/SiteLayout";
import { Metadata } from "core/src/components/Metadata";
import { useFlexSearch } from "react-use-flexsearch";

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
  }[];
  return (
    <SiteLayout>
      <div>
        <h1>Search</h1>
        <input onChange={(e) => setQuery(e.target.value)} />
        {results.map(({ id, slug, name }) => (
          <div key={id}>
            <Link to={`/recipe/view/${slug}`}>{name}</Link>
          </div>
        ))}
      </div>
    </SiteLayout>
  );
};

export default RecipeSearchPage;

export const Head: HeadFC<Queries.RecipePageQuery> = ({ data: { recipe } }) => (
  <Metadata title={recipe?.name} />
);
