export interface OpenFoodFactsProduct {
  code: string;
  product_name: string;
  brands: string;
  image_url: string;
  nutriments: {
    'energy-kcal_100g'?: number;
    'sugars_100g'?: number;
    'fat_100g'?: number;
    'proteins_100g'?: number;
    'salt_100g'?: number;
    'carbohydrates_100g'?: number;
    'fiber_100g'?: number;
  };
  ingredients_text_en?: string;
  categories?: string;
  serving_size?: string;
  allergens_tags?: string[];
}

const CACHE_KEY_PREFIX = 'off_cache_';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CachedItem {
  timestamp: number;
  data: OpenFoodFactsProduct;
}

export const fetchProductByBarcode = async (barcode: string): Promise<OpenFoodFactsProduct | null> => {
  // Check cache first
  const cacheKey = `${CACHE_KEY_PREFIX}${barcode}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    try {
      const { timestamp, data } = JSON.parse(cached) as CachedItem;
      if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
        console.log('Returning cached product for:', barcode);
        return data;
      } else {
        localStorage.removeItem(cacheKey);
      }
    } catch (e) {
      localStorage.removeItem(cacheKey);
    }
  }

  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 1 && data.product) {
      // Cache the result
      const cacheItem: CachedItem = {
        timestamp: Date.now(),
        data: data.product as OpenFoodFactsProduct
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheItem));

      return data.product as OpenFoodFactsProduct;
    }

    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};
export const searchProductsByName = async (query: string): Promise<OpenFoodFactsProduct[]> => {
  if (!query.trim()) return [];

  const cacheKey = `${CACHE_KEY_PREFIX}search_${query}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    try {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
        return data as OpenFoodFactsProduct[];
      }
    } catch (e) {
      localStorage.removeItem(cacheKey);
    }
  }

  try {
    // Search using the search API
    // We limit to 20 products for performance
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=20`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.products && Array.isArray(data.products)) {
      const results = data.products as OpenFoodFactsProduct[];

      // Cache the search results
      localStorage.setItem(cacheKey, JSON.stringify({
        timestamp: Date.now(),
        data: results
      }));

      return results;
    }

    return [];
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};
