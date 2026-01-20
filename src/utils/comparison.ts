import { FoodItem } from '@/data/foodData';

export interface ComparisonResult {
  item: FoodItem;
  similarityScore: number;
  reasons: string[];
}

export const findSimilarItems = (
  currentItem: FoodItem,
  allItems: FoodItem[],
  maxResults: number = 5
): ComparisonResult[] => {
  const similarities: ComparisonResult[] = [];

  for (const item of allItems) {
    if (item.id === currentItem.id) continue;

    let score = 0;
    const reasons: string[] = [];

    // Same category (highest weight)
    if (item.category === currentItem.category) {
      score += 30;
      reasons.push(`Same category: ${item.category}`);
    }

    // Same brand
    if (item.brand === currentItem.brand) {
      score += 20;
      reasons.push(`Same brand: ${item.brand}`);
    }

    // Similar price range (within 30%)
    const priceDiff = Math.abs(item.price - currentItem.price) / currentItem.price;
    if (priceDiff <= 0.3) {
      score += 15;
      reasons.push('Similar price range');
    }

    // Similar nutritional profile
    const nutritionSimilarity = calculateNutritionSimilarity(item.nutrition, currentItem.nutrition);
    if (nutritionSimilarity > 0.7) {
      score += 20;
      reasons.push('Similar nutritional profile');
    }

    // Common tags
    const commonTags = item.tags.filter(tag => currentItem.tags.includes(tag));
    if (commonTags.length > 0) {
      score += commonTags.length * 5;
      reasons.push(`Common tags: ${commonTags.join(', ')}`);
    }

    // Similar health status
    if (item.healthStatus === currentItem.healthStatus) {
      score += 10;
      reasons.push(`Same health status: ${item.healthStatus}`);
    }

    // Only include items with meaningful similarity
    if (score >= 20) {
      similarities.push({
        item,
        similarityScore: score,
        reasons
      });
    }
  }

  // Sort by similarity score and return top results
  return similarities
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, maxResults);
};

export const calculateNutritionSimilarity = (
  nutrition1: FoodItem['nutrition'],
  nutrition2: FoodItem['nutrition']
): number => {
  const metrics: (keyof FoodItem['nutrition'])[] = ['calories', 'protein', 'fat', 'sugar'];
  let totalSimilarity = 0;

  for (const metric of metrics) {
    const value1 = nutrition1[metric];
    const value2 = nutrition2[metric];
    const max = Math.max(value1, value2);
    const min = Math.min(value1, value2);
    
    if (max > 0) {
      const similarity = min / max;
      totalSimilarity += similarity;
    }
  }

  return totalSimilarity / metrics.length;
};

export const getComparisonInsights = (items: FoodItem[]) => {
  if (items.length < 2) return [];

  const insights: string[] = [];
  
  // Find the healthiest option
  const healthiest = items.reduce((best, current) => 
    current.healthScore > best.healthScore ? current : best
  );
  
  insights.push(
    `🏆 ${healthiest.name} by ${healthiest.brand} is the healthiest choice with a score of ${healthiest.healthScore}/10`
  );

  // Find the best value
  const bestValue = items.reduce((best, current) => {
    const currentValue = current.healthScore / current.price;
    const bestValueScore = best.healthScore / best.price;
    return currentValue > bestValueScore ? current : best;
  });

  if (bestValue.id !== healthiest.id) {
    insights.push(
      `💰 ${bestValue.name} offers the best health value for money`
    );
  }

  // Find lowest calorie option
  const lowestCalorie = items.reduce((lowest, current) => 
    current.nutrition.calories < lowest.nutrition.calories ? current : lowest
  );

  if (lowestCalorie.id !== healthiest.id) {
    insights.push(
      `🥗 ${lowestCalorie.name} has the lowest calories (${lowestCalorie.nutrition.calories} cal)`
    );
  }

  // Find highest protein option
  const highestProtein = items.reduce((highest, current) => 
    current.nutrition.protein > highest.nutrition.protein ? current : highest
  );

  insights.push(
    `💪 ${highestProtein.name} has the most protein (${highestProtein.nutrition.protein}g)`
  );

  // Check for significant price differences
  const prices = items.map(item => item.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const priceRange = maxPrice - minPrice;

  if (priceRange > minPrice) {
    insights.push(
      `💸 Price range: ${minPrice} - ${maxPrice} (${Math.round((priceRange/minPrice) * 100)}% difference)`
    );
  }

  return insights;
};

export const getBrandComparison = (items: FoodItem[]) => {
  const brands = [...new Set(items.map(item => item.brand))];
  
  if (brands.length < 2) return [];

  return brands.map(brand => {
    const brandItems = items.filter(item => item.brand === brand);
    const avgHealthScore = brandItems.reduce((sum, item) => sum + item.healthScore, 0) / brandItems.length;
    const avgPrice = brandItems.reduce((sum, item) => sum + item.price, 0) / brandItems.length;

    return {
      brand,
      itemCount: brandItems.length,
      avgHealthScore: Math.round(avgHealthScore * 10) / 10,
      avgPrice: Math.round(avgPrice),
      items: brandItems
    };
  });
};
