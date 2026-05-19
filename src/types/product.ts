export type ProductCategory = "mass-gainer" | "whey-protein";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  flavor: string;
  weight: string;
  highlights: string[];
  image: string;
  gallery: string[];
  description: string;
  benefits: string[];
  nutritionFacts: Array<{
    label: string;
    value: string;
  }>;
  ingredients: string[];
  usageInstructions: string[];
  proteinGrams: number;
  calories: number;
  releaseOrder: number;
  isFeatured?: boolean;
  mrp: number;
  availableFlavors: string[];
};
