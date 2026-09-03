import { barcodeDatabase, BarcodeProduct } from '@/data/barcodeDatabase';
import { foodItems, FoodItem } from '@/data/foodData';
import { fetchProductByBarcodeFromOFF, searchOpenFoodFacts, OpenFoodFactsProduct } from './openFoodFacts';
import {
  calculateNutriDsaHealthScore,
  normalizeNutritionPer100g,
  NutritionData,
  HealthRatingLabel
} from '@/utils/nutriDsaScore';

export interface UnifiedProduct {
  id: string;
  barcode?: string;
  name: string;
  brand: string;
  category: string;
  image?: string;
  price?: number;
  servingSize?: string;
  nutriscoreGrade?: 'a' | 'b' | 'c' | 'd' | 'e';
  novaGroup?: 1 | 2 | 3 | 4;
  healthScore: number;
  nutriDsaScore: number;
  nutriDsaConfidence: number;
  nutriDsaLabel: HealthRatingLabel;
  healthStatus: 'safe' | 'moderate' | 'high-risk';
  nutrition?: {
    calories?: number;
    protein?: number;
    carbohydrates?: number;
    fat?: number;
    sugar?: number;
    fiber?: number;
    sodium?: number;
    saturatedFat?: number;
  };
  nutrition100g?: NutritionData;
  ingredients?: string[];
  allergens?: string[];
  source: 'local' | 'openfoodfacts';
}

// Convert Open Food Facts API raw item into UnifiedProduct
export const mapOFFProductToUnified = (offProduct: OpenFoodFactsProduct): UnifiedProduct => {
  const nutriments = offProduct.nutriments || {};
  
  const hasCalories = typeof nutriments['energy-kcal_100g'] === 'number';
  const hasProtein = typeof nutriments['proteins_100g'] === 'number';
  const hasCarbs = typeof nutriments['carbohydrates_100g'] === 'number';
  const hasFat = typeof nutriments['fat_100g'] === 'number';

  const nutrition = (hasCalories || hasProtein || hasCarbs || hasFat) ? {
    calories: hasCalories ? Math.round(nutriments['energy-kcal_100g']!) : undefined,
    protein: hasProtein ? Math.round(nutriments['proteins_100g']! * 10) / 10 : undefined,
    carbohydrates: hasCarbs ? Math.round(nutriments['carbohydrates_100g']! * 10) / 10 : undefined,
    fat: hasFat ? Math.round(nutriments['fat_100g']! * 10) / 10 : undefined,
    sugar: typeof nutriments['sugars_100g'] === 'number' ? Math.round(nutriments['sugars_100g']! * 10) / 10 : undefined,
    fiber: typeof nutriments['fiber_100g'] === 'number' ? Math.round(nutriments['fiber_100g']! * 10) / 10 : undefined,
    sodium: typeof nutriments['salt_100g'] === 'number' ? Math.round(nutriments['salt_100g']! * 1000) : (typeof nutriments['sodium_100g'] === 'number' ? Math.round(nutriments['sodium_100g']! * 1000) : undefined),
    saturatedFat: typeof nutriments['saturated-fat_100g'] === 'number' ? Math.round(nutriments['saturated-fat_100g']! * 10) / 10 : undefined,
  } : undefined;

  // OpenFoodFacts is already per 100g
  const nutrition100g = normalizeNutritionPer100g(nutrition, offProduct.serving_size, true);
  nutrition100g.nova = offProduct.nova_group;

  const rating = calculateNutriDsaHealthScore(nutrition100g);

  let healthStatus: 'safe' | 'moderate' | 'high-risk' = 'moderate';
  if (rating.score >= 70) healthStatus = 'safe';
  else if (rating.score <= 40) healthStatus = 'high-risk';

  const rawIngredients = offProduct.ingredients_text_en || offProduct.ingredients_text;
  const ingredients = rawIngredients
    ? rawIngredients.split(/[,;\n]/).map(i => i.trim()).filter(Boolean)
    : undefined;

  const allergens = offProduct.allergens_tags
    ? offProduct.allergens_tags.map(a => a.replace(/^en:/, '').replace(/-/g, ' '))
    : undefined;

  return {
    id: offProduct.code,
    barcode: offProduct.code,
    name: offProduct.product_name || offProduct.product_name_en || 'Unknown Product',
    brand: offProduct.brands?.split(',')[0]?.trim() || 'Generic Brand',
    category: offProduct.categories?.split(',')[0]?.trim() || 'Food Product',
    image: offProduct.image_front_url || offProduct.image_url,
    servingSize: offProduct.serving_size,
    nutriscoreGrade: offProduct.nutriscore_grade,
    novaGroup: offProduct.nova_group,
    healthScore: rating.score,
    nutriDsaScore: rating.score,
    nutriDsaConfidence: rating.confidence,
    nutriDsaLabel: rating.label,
    healthStatus,
    nutrition,
    nutrition100g,
    ingredients,
    allergens,
    source: 'openfoodfacts'
  };
};

// Convert BarcodeProduct (local) to UnifiedProduct
export const mapLocalBarcodeToUnified = (item: BarcodeProduct): UnifiedProduct => {
  const nutrition100g = normalizeNutritionPer100g(item.nutrition, item.servingSize, false);
  const rating = calculateNutriDsaHealthScore(nutrition100g);

  let healthStatus: 'safe' | 'moderate' | 'high-risk' = 'moderate';
  if (rating.score >= 70) healthStatus = 'safe';
  else if (rating.score <= 40) healthStatus = 'high-risk';

  return {
    id: item.barcode,
    barcode: item.barcode,
    name: item.name,
    brand: item.brand,
    category: item.category,
    image: item.image,
    price: item.price,
    servingSize: item.servingSize,
    healthScore: rating.score,
    nutriDsaScore: rating.score,
    nutriDsaConfidence: rating.confidence,
    nutriDsaLabel: rating.label,
    healthStatus,
    nutrition: item.nutrition,
    nutrition100g,
    ingredients: item.ingredients,
    allergens: item.allergens,
    source: 'local'
  };
};

// Convert FoodItem (local) to UnifiedProduct
export const mapFoodItemToUnified = (item: FoodItem): UnifiedProduct => {
  const nutrition100g = normalizeNutritionPer100g(item.nutrition, item.servingSize, false);
  const rating = calculateNutriDsaHealthScore(nutrition100g);

  let healthStatus: 'safe' | 'moderate' | 'high-risk' = 'moderate';
  if (rating.score >= 70) healthStatus = 'safe';
  else if (rating.score <= 40) healthStatus = 'high-risk';

  return {
    id: item.id,
    name: item.name,
    brand: item.brand || 'Healthful Bites',
    category: item.category,
    image: item.image,
    price: item.price,
    servingSize: item.servingSize,
    healthScore: rating.score,
    nutriDsaScore: rating.score,
    nutriDsaConfidence: rating.confidence,
    nutriDsaLabel: rating.label,
    healthStatus,
    nutrition: item.nutrition,
    nutrition100g,
    ingredients: item.ingredients,
    allergens: item.allergens,
    source: 'local'
  };
};

// Central Service Class
class ProductService {
  private memoryCache = new Map<string, UnifiedProduct>();

  // Fetch product by Barcode (Local Cache -> Open Food Facts API -> null)
  async getProductByBarcode(barcode: string): Promise<UnifiedProduct | null> {
    const cleanBarcode = barcode.trim();
    if (!cleanBarcode) return null;

    if (this.memoryCache.has(cleanBarcode)) {
      return this.memoryCache.get(cleanBarcode)!;
    }

    // 1. Check local database
    const localMatch = barcodeDatabase.find(
      p => p.barcode === cleanBarcode || p.barcode.replace(/[\s-]/g, '') === cleanBarcode.replace(/[\s-]/g, '')
    );

    if (localMatch) {
      const unified = mapLocalBarcodeToUnified(localMatch);
      this.memoryCache.set(cleanBarcode, unified);
      return unified;
    }

    // 2. Fallback to Open Food Facts API
    const offProduct = await fetchProductByBarcodeFromOFF(cleanBarcode);
    if (offProduct) {
      const unified = mapOFFProductToUnified(offProduct);
      this.memoryCache.set(cleanBarcode, unified);
      return unified;
    }

    return null;
  }

  // Fetch product by ID (barcode or local ID)
  async getProductById(id: string): Promise<UnifiedProduct | null> {
    if (this.memoryCache.has(id)) {
      return this.memoryCache.get(id)!;
    }

    // Check foodItems
    const localFood = foodItems.find(f => f.id === id);
    if (localFood) {
      const unified = mapFoodItemToUnified(localFood);
      this.memoryCache.set(id, unified);
      return unified;
    }

    // Attempt barcode lookup
    return this.getProductByBarcode(id);
  }

  // Search Products (Local First -> Open Food Facts API fallback)
  async searchProducts(query: string): Promise<UnifiedProduct[]> {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return [];

    // 1. Search Local Food Data & Local Barcode Database
    const localMatches: UnifiedProduct[] = [];

    foodItems.forEach(item => {
      if (
        item.name.toLowerCase().includes(cleanQuery) ||
        item.category.toLowerCase().includes(cleanQuery) ||
        (item.brand && item.brand.toLowerCase().includes(cleanQuery))
      ) {
        localMatches.push(mapFoodItemToUnified(item));
      }
    });

    barcodeDatabase.forEach(item => {
      if (
        item.name.toLowerCase().includes(cleanQuery) ||
        item.brand.toLowerCase().includes(cleanQuery) ||
        item.category.toLowerCase().includes(cleanQuery)
      ) {
        if (!localMatches.some(m => m.id === item.barcode)) {
          localMatches.push(mapLocalBarcodeToUnified(item));
        }
      }
    });

    // If local search gives 4 or more results, return local matches immediately for speed
    if (localMatches.length >= 4 || cleanQuery.length < 3) {
      return localMatches;
    }

    // 2. Fetch from Open Food Facts API
    const offResults = await searchOpenFoodFacts(cleanQuery);
    const offUnified = offResults.map(mapOFFProductToUnified);

    // Merge without duplicates
    const combined = [...localMatches];
    offUnified.forEach(offItem => {
      if (!combined.some(c => c.id === offItem.id || c.name.toLowerCase() === offItem.name.toLowerCase())) {
        combined.push(offItem);
      }
    });

    return combined;
  }

  // Get Featured / Popular Products for initial explore view
  getFeaturedProducts(category?: string): UnifiedProduct[] {
    const all: UnifiedProduct[] = [];

    // Local food items
    foodItems.forEach(item => {
      all.push(mapFoodItemToUnified(item));
    });

    // Local barcode products
    barcodeDatabase.forEach(item => {
      if (!all.some(a => a.id === item.barcode || a.name.toLowerCase() === item.name.toLowerCase())) {
        all.push(mapLocalBarcodeToUnified(item));
      }
    });

    if (!category || category === 'all') {
      return all;
    }

    return all.filter(p =>
      p.category.toLowerCase().includes(category.toLowerCase()) ||
      (category === 'pantry' && p.category.toLowerCase().includes('lunch'))
    );
  }
}

export const productService = new ProductService();
