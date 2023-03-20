import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { kebabCase } from "lodash";
import SiteLayout from "core/src/components/SiteLayout";

const IngredientsPage: React.FC<PageProps<Queries.IngredientsPageQuery>> = ({
  data,
}) => {
  const {
    allIngredientLink: { group },
  } = data;
  return (
    <SiteLayout>
      <div>
        <h2>Ingredients</h2>
        {group.map(({ fieldValue, totalCount }) => {
          return (
            fieldValue && (
              <div>
                <Link to={`/ingredients/${kebabCase(fieldValue)}`}>
                  {fieldValue} ({totalCount})
                </Link>
              </div>
            )
          );
        })}
      </div>
    </SiteLayout>
  );
};

export default IngredientsPage;

export const query = graphql`
  query IngredientsPage {
    allIngredientLink {
      group(field: { ingredient: SELECT }) {
        fieldValue
        totalCount
      }
    }
  }
`;
