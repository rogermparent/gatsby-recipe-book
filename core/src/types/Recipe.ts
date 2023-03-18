export interface JSONRecipeInstruction {
  name: string;
  text: string;
}

export interface JSONRecipeIngredient {
  unit?: string;
  quantity?: string;
  ingredient?: string;
  note?: string;
}

export interface JSONRecipeNutrition {
  calories: string;
}

export interface JSONRecipeAuthor {
  name?: string;
  url?: string;
}

export interface JSONRecipe {
  name: string;
  author?: JSONRecipeAuthor[];
  datePublished?: string;
  description?: string;
  prepTime?: number;
  cookTime?: number;
  totalTime?: number;
  keywords?: string[];
  servings?: string;
  servingSize?: string;
  category?: string[];
  cuisine?: string[];
  nutrition?: JSONRecipeNutrition[];
  ingredients?: JSONRecipeIngredient[];
  instructions?: JSONRecipeInstruction[];
}
