import React from "react";
import { ChangeEvent, ReactNode, Reducer, useMemo, useReducer } from "react";
import Fraction from "fraction.js";
import * as styles from "./styles.css";

import { GatsbyImage, getImage } from "gatsby-plugin-image";

export const Ingredient = ({
  ingredient,
  quantity,
  unit,
  multiplier,
  note,
}: Queries.RecipeIngredientDisplayDataFragment & { multiplier?: Fraction }) => {
  const parsedQuantity = useMemo(
    () => quantity && new Fraction(quantity),
    [quantity]
  );
  const multipliedQuantity =
    parsedQuantity && multiplier && !multiplier.equals(1)
      ? parsedQuantity.mul(multiplier)
      : parsedQuantity;
  return (
    <li>
      <div>
        <label>
          <input type="checkbox" />{" "}
          {multipliedQuantity && (
            <span>{multipliedQuantity.toFraction(true)}</span>
          )}{" "}
          {unit && <span>{unit}</span>} <span>{ingredient}</span>
          {note && (
            <span>
              , <span>{note}</span>
            </span>
          )}
        </label>
      </div>
    </li>
  );
};

export const Instruction = ({
  name,
  text,
}: Queries.RecipeInstructionDisplayDataFragment) => (
  <li>
    {name && <h3>{name}</h3>}
    {text}
  </li>
);

const fractionInputReducer: Reducer<
  { fraction?: Fraction; input?: string },
  string
> = (state, input) => {
  if (input === state.input) {
    return state;
  }
  if (!input || input === "1") {
    return { fraction: undefined, input };
  }
  try {
    const fraction = new Fraction(input);
    return { fraction, input };
  } catch (e) {
    return state;
  }
};

const InfoCard: React.FC<{
  title?: string;
  children: ReactNode;
  className?: string;
}> = ({ title, children, className }) => (
  <div className={className}>
    <div>
      {title && <div>{title}</div>}
      <div>{children}</div>
    </div>
  </div>
);

export const Ingredients = ({
  ingredients,
  multiplier,
}: {
  ingredients?: Queries.RecipeDisplayDataFragment["ingredients"];
  multiplier?: Fraction;
}) => {
  return (
    <>
      {ingredients && (
        <div>
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map(({ ingredient, quantity, unit, note }, i) => (
              <Ingredient
                key={i}
                ingredient={ingredient}
                quantity={quantity}
                unit={unit}
                multiplier={multiplier}
                note={note}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export const Recipe = ({
  name,
  ingredients,
  instructions,
  prepTime,
  cookTime,
  totalTime,
  servings,
  servingSize,
  description,
  image,
}: Queries.RecipeDisplayDataFragment) => {
  const [{ fraction: multiplier }, setMultiplier] = useReducer(
    fractionInputReducer,
    {}
  );

  const multipliedServings =
    multiplier && servings
      ? multiplier.mul(servings).toFraction(true)
      : servings;

  const imageData = image?.childImageSharp && getImage(image.childImageSharp);
  return (
    <div>
      <h1 className={styles.title}>{name}</h1>
      {description && <p>{description}</p>}
      {imageData && <GatsbyImage image={imageData} alt="" />}
      <div>
        <div>
          {prepTime && <InfoCard title="Prep Time">{prepTime}</InfoCard>}
          {cookTime && <InfoCard title="Cook Time">{cookTime}</InfoCard>}
          {totalTime && <InfoCard title="Total Time">{totalTime}</InfoCard>}
        </div>
        <div>
          {multipliedServings && (
            <InfoCard title="Servings">
              <span>{multipliedServings}</span>{" "}
              {servingSize && <span>{servingSize}</span>}
            </InfoCard>
          )}

          <label htmlFor="multiplier">
            <div>Multiply</div>
            <input
              id="multiplier"
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                setMultiplier(e.target.value);
              }}
            />
          </label>
        </div>
      </div>
      <div>
        <Ingredients ingredients={ingredients} multiplier={multiplier} />
        {instructions && (
          <div>
            <h2>Instructions</h2>
            <ol>
              {instructions.map(({ name, text }, i) => (
                <Instruction key={i} name={name} text={text} />
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};
