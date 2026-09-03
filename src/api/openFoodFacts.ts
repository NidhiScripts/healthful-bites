export interface OpenFoodFactsProduct {
  code: string;
  product_name?: string;
  product_name_en?: string;
  brands?: string;
  image_url?: string;
  image_front_url?: string;
  nutriscore_grade?: 'a' | 'b' | 'c' | 'd' | 'e';
  nova_group?: 1 | 2 | 3 | 4;
  nutriments?: {
    'energy-kcal_100g'?: number;
    'sugars_100g'?: number;
    'fat_100g'?: number;
    'proteins_100g'?: number;
    'salt_100g'?: number;
    'sodium_100g'?: number;
    'carbohydrates_100g'?: number;
    'fiber_100g'?: number;
    'saturated-fat_100g'?: number;
  };
  ingredients_text?: string;
  ingredients_text_en?: string;
  categories?: string;
  serving_size?: string;
  allergens_tags?: string[];
}

const CACHE_KEY_PREFIX = 'off_cache_v2_';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CachedItem<T> {
  timestamp: number;
  data: T;
}

const USER_AGENT = 'NutriDSA/1.0 (contact@nutridsa.app)';

export const fetchProductByBarcodeFromOFF = async (barcode: string): Promise<OpenFoodFactsProduct | null> => {
  const cleanBarcode = barcode.trim();
  if (!cleanBarcode) return null;

  const cacheKey = `${CACHE_KEY_PREFIX}${cleanBarcode}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    try {
      const { timestamp, data } = JSON.parse(cached) as CachedItem<OpenFoodFactsProduct>;
      if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
        return data;
      } else {
        localStorage.removeItem(cacheKey);
      }
    } catch {
      localStorage.removeItem(cacheKey);
    }
  }

  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(cleanBarcode)}.json`, {
      headers: {
        'User-Agent': USER_AGENT
      }
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.status === 1 && data.product) {
      const product = data.product as OpenFoodFactsProduct;
      localStorage.setItem(cacheKey, JSON.stringify({
        timestamp: Date.now(),
        data: product
      }));
      return product;
    }

    return null;
  } catch (error) {
    console.warn('OpenFoodFacts fetch error:', error);
    return null;
  }
};

export const searchOpenFoodFacts = async (query: string): Promise<OpenFoodFactsProduct[]> => {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery || cleanQuery.length < 2) return [];

  const cacheKey = `${CACHE_KEY_PREFIX}search_${cleanQuery}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    try {
      const { timestamp, data } = JSON.parse(cached) as CachedItem<OpenFoodFactsProduct[]>;
      if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
        return data;
      }
    } catch {
      localStorage.removeItem(cacheKey);
    }
  }

  try {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(cleanQuery)}&search_simple=1&action=process&json=1&page_size=15`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT
      }
    });

    if (!response.ok) return [];

    const data = await response.json();

    if (data.products && Array.isArray(data.products)) {
      const products = data.products as OpenFoodFactsProduct[];
      localStorage.setItem(cacheKey, JSON.stringify({
        timestamp: Date.now(),
        data: products
      }));
      return products;
    }

    return [];
  } catch (error) {
    console.warn('OpenFoodFacts search error:', error);
    return [];
  }
};
