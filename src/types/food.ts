export interface NutritionalInfo {
  calories: number;
  protein: number; // g
  carbohydrates: number; // g
  fat: number; // g
  fiber: number; // g
  sugar: number; // g
  sodium: number; // mg
  cholesterol: number; // mg
}

export interface AllergenInfo {
  gluten: boolean;
  dairy: boolean;
  nuts: boolean;
  soy: boolean;
  eggs: boolean;
  shellfish: boolean;
}

export interface DiabeticInfo {
  glycemicIndex: number;
  sugarContent: number; // g
  carbohydrateCount: number; // g
  isDiabeticFriendly: boolean;
  warnings: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  ingredients: string[];
  nutrition: NutritionalInfo;
  allergens: AllergenInfo;
  diabetic: DiabeticInfo;
  servingSize: string;
  price: number;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  brands: Brand[];
}

export interface Brand {
  id: string;
  name: string;
  products: Product[];
}

export interface ComparisonResult {
  product: Product;
  healthScore: number;
  diabeticScore: number;
  allergenRisk: 'low' | 'medium' | 'high';
  recommendations: string[];
}
