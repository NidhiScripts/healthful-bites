import { Product, ComparisonResult } from '@/types/food';

export const calculateHealthScore = (product: Product): number => {
  let score = 10;
  
  // Calories penalty (lower is better)
  if (product.nutrition.calories > 400) score -= 2;
  else if (product.nutrition.calories > 300) score -= 1;
  
  // Sugar penalty (lower is better)
  if (product.nutrition.sugar > 20) score -= 3;
  else if (product.nutrition.sugar > 10) score -= 2;
  else if (product.nutrition.sugar > 5) score -= 1;
  
  // Sodium penalty (lower is better)
  if (product.nutrition.sodium > 600) score -= 2;
  else if (product.nutrition.sodium > 400) score -= 1;
  
  // Protein bonus (higher is better)
  if (product.nutrition.protein > 15) score += 2;
  else if (product.nutrition.protein > 10) score += 1;
  
  // Fiber bonus (higher is better)
  if (product.nutrition.fiber > 5) score += 2;
  else if (product.nutrition.fiber > 3) score += 1;
  
  // Fat penalty (lower is better)
  if (product.nutrition.fat > 20) score -= 2;
  else if (product.nutrition.fat > 15) score -= 1;
  
  return Math.max(1, Math.min(10, score));
};

export const calculateDiabeticScore = (product: Product): number => {
  let score = 10;
  
  // Glycemic index penalty (lower is better)
  if (product.diabetic.glycemicIndex > 80) score -= 4;
  else if (product.diabetic.glycemicIndex > 70) score -= 3;
  else if (product.diabetic.glycemicIndex > 60) score -= 2;
  else if (product.diabetic.glycemicIndex > 50) score -= 1;
  
  // Sugar content penalty (lower is better)
  if (product.diabetic.sugarContent > 25) score -= 3;
  else if (product.diabetic.sugarContent > 15) score -= 2;
  else if (product.diabetic.sugarContent > 8) score -= 1;
  
  // Carbohydrate penalty (lower is better)
  if (product.diabetic.carbohydrateCount > 50) score -= 2;
  else if (product.diabetic.carbohydrateCount > 30) score -= 1;
  
  return Math.max(1, Math.min(10, score));
};

export const calculateAllergenRisk = (product: Product): 'low' | 'medium' | 'high' => {
  const allergenCount = Object.values(product.allergens).filter(Boolean).length;
  
  if (allergenCount === 0) return 'low';
  if (allergenCount <= 2) return 'medium';
  return 'high';
};

export const generateRecommendations = (product: Product): string[] => {
  const recommendations: string[] = [];
  
  if (product.nutrition.calories > 400) {
    recommendations.push('High in calories - consider portion control');
  }
  
  if (product.nutrition.sugar > 15) {
    recommendations.push('High sugar content - limit consumption');
  }
  
  if (product.nutrition.sodium > 600) {
    recommendations.push('High sodium - monitor intake');
  }
  
  if (product.nutrition.protein > 15) {
    recommendations.push('Good protein source');
  }
  
  if (product.nutrition.fiber > 3) {
    recommendations.push('Good fiber content');
  }
  
  if (product.diabetic.isDiabeticFriendly) {
    recommendations.push('Suitable for diabetics in moderation');
  } else {
    recommendations.push('Not recommended for diabetics');
  }
  
  const allergenRisk = calculateAllergenRisk(product);
  if (allergenRisk === 'high') {
    recommendations.push('Contains multiple common allergens');
  } else if (allergenRisk === 'medium') {
    recommendations.push('Contains some allergens - check labels');
  }
  
  return recommendations;
};

export const compareProducts = (products: Product[]): ComparisonResult[] => {
  return products.map(product => ({
    product,
    healthScore: calculateHealthScore(product),
    diabeticScore: calculateDiabeticScore(product),
    allergenRisk: calculateAllergenRisk(product),
    recommendations: generateRecommendations(product)
  }));
};

export const getBestForDiabetics = (products: Product[]): Product => {
  return products.reduce((best, current) => {
    const currentScore = calculateDiabeticScore(current);
    const bestScore = calculateDiabeticScore(best);
    return currentScore > bestScore ? current : best;
  });
};

export const getHealthiestOption = (products: Product[]): Product => {
  return products.reduce((best, current) => {
    const currentScore = calculateHealthScore(current);
    const bestScore = calculateHealthScore(best);
    return currentScore > bestScore ? current : best;
  });
};

export const getLowestCalorie = (products: Product[]): Product => {
  return products.reduce((best, current) => {
    return current.nutrition.calories < best.nutrition.calories ? current : best;
  });
};

export const getHighestProtein = (products: Product[]): Product => {
  return products.reduce((best, current) => {
    return current.nutrition.protein > best.nutrition.protein ? current : best;
  });
};
