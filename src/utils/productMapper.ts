import { FoodItem } from '@/data/foodData';
import { OpenFoodFactsProduct } from '@/services/openFoodFactsService';
import { calculateHealthScore } from './comparisonUtils';

export const mapOpenFoodFactsToFoodItem = (
    apiProduct: OpenFoodFactsProduct
): FoodItem => {
    // Extract nutrition per 100g (default fallback to 0)
    const nutrition = {
        calories: Math.round(apiProduct.nutriments['energy-kcal_100g'] || 0),
        sugar: Math.round(apiProduct.nutriments['sugars_100g'] || 0),
        fat: Math.round(apiProduct.nutriments['fat_100g'] || 0),
        protein: Math.round(apiProduct.nutriments['proteins_100g'] || 0),
        sodium: Math.round((apiProduct.nutriments['salt_100g'] || 0) * 1000), // Convert salt(g) to sodium(mg) approx
        carbohydrates: Math.round(apiProduct.nutriments['carbohydrates_100g'] || 0),
        fiber: Math.round(apiProduct.nutriments['fiber_100g'] || 0),
    };

    // Create a temporary object to calculate health score
    // We match the 'Product' interface expected by comparisonUtils roughly
    const tempForScore = {
        nutrition,
        allergens: apiProduct.allergens_tags || [],
        diabetic: {
            glycemicIndex: 50, // Default assumption if unknown
            sugarContent: nutrition.sugar,
            carbohydrateCount: nutrition.carbohydrates,
            isDiabeticFriendly: nutrition.sugar < 10 && nutrition.carbohydrates < 30
        }
    };

    // Calculate scores
    // Note: We cast to any because the full Product interface might be complex, 
    // but calculateHealthScore only looks at specific fields we provided.
    const healthScore = calculateHealthScore(tempForScore as any);

    // Determine health status based on score
    let healthStatus: 'safe' | 'moderate' | 'high-risk' = 'moderate';
    if (healthScore >= 8) healthStatus = 'safe';
    if (healthScore <= 4) healthStatus = 'high-risk';

    return {
        id: apiProduct.code,
        name: apiProduct.product_name || 'Unknown Product',
        description: `Barcoded Product (${apiProduct.brands || 'Unknown Brand'})`,
        price: 0, // Price is unknown from this API
        image: apiProduct.image_url || '',
        category: 'snacks', // Default category, logic could be improved
        nutrition,
        healthScore,
        healthStatus,
        badges: ['Scanned', apiProduct.brands?.split(',')[0] || 'Unknown Brand'],
        healthNote: `Data fetched from OpenFoodFacts. Serving size: ${apiProduct.serving_size || '100g'}`,
        ingredients: apiProduct.ingredients_text_en
            ? apiProduct.ingredients_text_en.split(',').map(i => i.trim()).slice(0, 10)
            : [],
        brand: apiProduct.brands?.split(',')[0],
        servingSize: apiProduct.serving_size,
        allergens: apiProduct.allergens_tags || []
    } as FoodItem;
};
import { BarcodeProduct } from '@/data/barcodeDatabase';

export const mapOpenFoodFactsToBarcodeProduct = (
    apiProduct: OpenFoodFactsProduct
): BarcodeProduct => {
    return {
        barcode: apiProduct.code,
        name: apiProduct.product_name || 'Unknown Product',
        brand: apiProduct.brands?.split(',')[0] || 'Unknown Brand',
        category: apiProduct.categories?.split(',')[0] || 'Uncategorized',
        nutrition: {
            calories: Math.round(apiProduct.nutriments['energy-kcal_100g'] || 0),
            protein: Math.round(apiProduct.nutriments['proteins_100g'] || 0),
            carbohydrates: Math.round(apiProduct.nutriments['carbohydrates_100g'] || 0),
            fat: Math.round(apiProduct.nutriments['fat_100g'] || 0),
            fiber: Math.round(apiProduct.nutriments['fiber_100g'] || 0),
            sugar: Math.round(apiProduct.nutriments['sugars_100g'] || 0),
            sodium: Math.round((apiProduct.nutriments['salt_100g'] || 0) * 1000),
        },
        price: 0, // Not available in OFF
        image: apiProduct.image_url,
        ingredients: apiProduct.ingredients_text_en?.split(',').map(i => i.trim()),
        allergens: apiProduct.allergens_tags?.map(a => a.replace('en:', '')),
        servingSize: apiProduct.serving_size
    };
};
