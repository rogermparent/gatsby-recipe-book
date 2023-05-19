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
    <li className={styles.ingredientsListItem}>
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
  <li className={styles.instructionsListItem}>
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
}> = ({ title, children, className = styles.infoCardWrapper }) => (
  <div className={className}>
    <div className={styles.infoCard}>
      {title && <div className={styles.infoCardTitle}>{title}</div>}
      <div className={styles.infoCardBody}>{children}</div>
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
        <div className={styles.ingredientsSection}>
          <h2 className={styles.ingredientsHeading}>Ingredients</h2>
          <ul className={styles.ingredientsList}>
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
    <div className={styles.container}>
      <h1 className={styles.title}>{name}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {imageData && (
        <GatsbyImage image={imageData} alt="" className={styles.primaryImage} />
      )}
      <div className={styles.infoCards}>
        <div className={styles.infoCardGroup}>
          {prepTime && <InfoCard title="Prep Time">{prepTime}</InfoCard>}
          {cookTime && <InfoCard title="Cook Time">{cookTime}</InfoCard>}
          {totalTime && <InfoCard title="Total Time">{totalTime}</InfoCard>}
        </div>
        <div className={styles.infoCardGroup}>
          {multipliedServings && (
            <InfoCard title="Servings">
              <span>{multipliedServings}</span>{" "}
              {servingSize && <span>{servingSize}</span>}
            </InfoCard>
          )}

          <label htmlFor="multiplier" className={styles.multiplier}>
            <div>Multiply</div>
            <input
              className={styles.multiplyInput}
              id="multiplier"
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                setMultiplier(e.target.value);
              }}
            />
          </label>
        </div>
      </div>
      <div className={styles.ingredientsAndInstructions}>
        <Ingredients ingredients={ingredients} multiplier={multiplier} />
        {instructions && (
          <div>
            <h2 className={styles.instructionsHeading}>Instructions</h2>
            <ol className={styles.instructionsList}>
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
