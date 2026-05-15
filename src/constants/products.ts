import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "kyrox-mass-gainer",
    slug: "kyrox-muscle-mass-gainer",
    name: "Kyrox Muscle Mass Gainer",
    category: "mass-gainer",
    categoryLabel: "Mass Gainer",
    flavor: "Chocolate Fudge",
    weight: "3 kg",
    highlights: ["423 kcal", "72g Carbs", "Weight Gain Support"],
    image: "kyrox-mass-gainer-placeholder",
    gallery: [
      "Front Pack",
      "Formula Detail",
      "Nutrition Panel",
      "Lifestyle Shot",
    ],
    description:
      "High-calorie performance nutrition designed to support size, strength, and consistent weight-gain phases.",
    benefits: ["Weight Gain Support", "Recovery Support", "Energy Support"],
    nutritionFacts: [
      { label: "Calories", value: "423 kcal" },
      { label: "Protein", value: "17g" },
      { label: "Carbs", value: "72g" },
    ],
    ingredients: [
      "Complex carbohydrate blend",
      "Whey protein concentrate",
      "Digestive enzyme support",
      "Cocoa flavor system",
    ],
    usageInstructions: [
      "Mix one serving with water or milk.",
      "Consume post-workout or between meals.",
      "Use consistently during weight-gain phases.",
    ],
    proteinGrams: 17,
    calories: 423,
    releaseOrder: 2,
    isFeatured: true,
  },
  {
    id: "kyrox-anabolic-mass-gainer",
    slug: "anabolic-mass-gainer",
    name: "Kyrox Muscle Anabolic Mass Gainer",
    category: "mass-gainer",
    categoryLabel: "Mass Gainer",
    flavor: "Belgian Chocolate",
    weight: "3 kg",
    highlights: ["30g Protein", "Recovery Support", "Added Creatine"],
    image: "kyrox-anabolic-mass-gainer-placeholder",
    gallery: ["Front Pack", "Creatine Blend", "Macro Panel", "Training Fuel"],
    description:
      "An anabolic mass formula built for recovery, lean size support, and strength-focused training blocks.",
    benefits: ["Weight Gain Support", "Recovery Support", "Energy Support"],
    nutritionFacts: [
      { label: "Protein", value: "30g" },
      { label: "Carbs", value: "60g" },
      { label: "Creatine", value: "Added" },
    ],
    ingredients: [
      "Whey protein blend",
      "Creatine monohydrate",
      "Performance carbohydrate matrix",
      "Recovery mineral support",
    ],
    usageInstructions: [
      "Mix one serving with water or milk.",
      "Consume after training for recovery support.",
      "Use as part of a calorie-surplus nutrition plan.",
    ],
    proteinGrams: 30,
    calories: 390,
    releaseOrder: 3,
    isFeatured: true,
  },
  {
    id: "kyrox-nitra-whey-protein",
    slug: "nitra-whey-protein",
    name: "Kyrox Muscle Nitra Whey Protein",
    category: "whey-protein",
    categoryLabel: "Whey Protein",
    flavor: "Rich Chocolate",
    weight: "1 kg",
    highlights: ["26g Protein", "Whey Isolate Blend", "3g Creatine"],
    image: "kyrox-nitra-whey-placeholder",
    gallery: [
      "Front Pack",
      "Whey Isolate Blend",
      "Creatine Detail",
      "Lean Muscle Fuel",
    ],
    description:
      "A high-protein whey isolate blend with creatine support for recovery, strength, and daily muscle nutrition.",
    benefits: ["Lean Muscle Growth", "Recovery", "Strength Enhancement"],
    nutritionFacts: [
      { label: "Protein", value: "26g" },
      { label: "Creatine", value: "3g" },
      { label: "Blend", value: "Whey Isolate" },
    ],
    ingredients: [
      "Whey protein isolate blend",
      "Creatine monohydrate",
      "Cocoa powder",
      "Low-sugar flavor system",
    ],
    usageInstructions: [
      "Mix one serving with water or milk.",
      "Consume post-workout or any time protein intake is needed.",
      "Use daily to support lean muscle nutrition.",
    ],
    proteinGrams: 26,
    calories: 145,
    releaseOrder: 1,
    isFeatured: true,
  },
];

export const productCategories = [
  { label: "All Products", value: "all" },
  { label: "Mass Gainers", value: "mass-gainer" },
  { label: "Whey Protein", value: "whey-protein" },
] as const;

export const productSortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Highest Protein", value: "highest-protein" },
  { label: "Highest Calories", value: "highest-calories" },
] as const;

export type ProductCategoryFilter = (typeof productCategories)[number]["value"];
export type ProductSortOption = (typeof productSortOptions)[number]["value"];
