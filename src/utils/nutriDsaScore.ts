/**
 * NutriDSA Health Score & Comparison Engine
 * Model: HealthScore = NutrientScore - ProcessingPenalty
 * Normalized per 100g basis.
 */

export interface NutritionData {
  calories: number | null;        // kcal per 100g
  protein: number | null;         // g per 100g
  carbs?: number | null;          // g per 100g
  fat: number | null;            // g per 100g
  saturatedFat?: number | null;   // g per 100g
  sugar: number | null;          // g per 100g
  sodium: number | null;         // mg per 100g
  fiber: number | null;          // g per 100g
  nova?: number | null;          // 1 - 4
}

export type HealthRatingLabel = 'Excellent' | 'Good' | 'Moderate' | 'Poor' | 'Very Poor';

export interface HealthScoreBreakdown {
  caloriePenalty: number;
  sugarPenalty: number;
  sodiumPenalty: number;
  fatPenalty: number;
  processingPenalty: number;
  proteinReward: number;
  fiberReward: number;
}

export interface HealthRating {
  score: number;             // 0 - 100
  confidence: number;        // 0 - 100 (%)
  label: HealthRatingLabel;
  breakdown: HealthScoreBreakdown;
  availableFields: number;
  totalFields: number;
}

/**
 * Parses numeric grams from a serving size string (e.g. "70g", "65 g", "1 serving (150g)", "100g")
 */
export function parseServingWeightGrams(servingSize?: string): number | null {
  if (!servingSize) return null;
  const match = servingSize.match(/(\d+(?:\.\d+)?)\s*(?:g|grams?)/i);
  if (match && match[1]) {
    const val = parseFloat(match[1]);
    if (val > 0) return val;
  }
  return null;
}

/**
 * Normalizes raw nutrition values to per 100g basis.
 * If raw is already per 100g or servingSize is not specified / is 100g, returns directly.
 */
export function normalizeNutritionPer100g(
  raw: {
    calories?: number | null;
    protein?: number | null;
    carbohydrates?: number | null;
    fat?: number | null;
    saturatedFat?: number | null;
    sugar?: number | null;
    sodium?: number | null;
    fiber?: number | null;
  } | undefined,
  servingSize?: string,
  alreadyPer100g: boolean = false
): NutritionData {
  if (!raw) {
    return {
      calories: null,
      protein: null,
      carbs: null,
      fat: null,
      saturatedFat: null,
      sugar: null,
      sodium: null,
      fiber: null,
    };
  }

  const servingGrams = !alreadyPer100g ? parseServingWeightGrams(servingSize) : null;
  const multiplier = servingGrams && servingGrams > 0 && Math.abs(servingGrams - 100) > 2
    ? 100 / servingGrams
    : 1;

  const normalizeVal = (val: number | null | undefined): number | null => {
    if (val == null || isNaN(val)) return null;
    return Math.round(val * multiplier * 10) / 10;
  };

  return {
    calories: raw.calories != null ? Math.round((raw.calories * multiplier)) : null,
    protein: normalizeVal(raw.protein),
    carbs: normalizeVal(raw.carbohydrates),
    fat: normalizeVal(raw.fat),
    saturatedFat: normalizeVal(raw.saturatedFat),
    sugar: normalizeVal(raw.sugar),
    sodium: raw.sodium != null ? Math.round(raw.sodium * multiplier) : null,
    fiber: normalizeVal(raw.fiber),
  };
}

/**
 * Computes NutriDSA 0-100 Health Score based strictly on per-100g data.
 */
export function calculateNutriDsaHealthScore(p: NutritionData): HealthRating {
  let score = 100;
  let available = 0;
  const total = 7;

  let caloriePenalty = 0;
  let sugarPenalty = 0;
  let sodiumPenalty = 0;
  let fatPenalty = 0;
  let proteinReward = 0;
  let fiberReward = 0;
  let processingPenalty = 0;

  // 1. Calories penalty (max 15)
  if (p.calories != null) {
    available++;
    if (p.calories > 500) caloriePenalty = 15;
    else if (p.calories > 400) caloriePenalty = 12;
    else if (p.calories > 300) caloriePenalty = 9;
    else if (p.calories > 200) caloriePenalty = 6;
    else if (p.calories > 100) caloriePenalty = 3;
    score -= caloriePenalty;
  }

  // 2. Sugar penalty (max 20)
  if (p.sugar != null) {
    available++;
    if (p.sugar > 22.5) sugarPenalty = 20;
    else if (p.sugar > 15) sugarPenalty = 16;
    else if (p.sugar > 10) sugarPenalty = 12;
    else if (p.sugar > 5) sugarPenalty = 7;
    else if (p.sugar > 2) sugarPenalty = 3;
    score -= sugarPenalty;
  }

  // 3. Sodium penalty (max 20, in mg/100g)
  if (p.sodium != null) {
    available++;
    if (p.sodium > 1200) sodiumPenalty = 20;
    else if (p.sodium > 900) sodiumPenalty = 17;
    else if (p.sodium > 600) sodiumPenalty = 13;
    else if (p.sodium > 300) sodiumPenalty = 8;
    else if (p.sodium > 120) sodiumPenalty = 4;
    score -= sodiumPenalty;
  }

  // 4. Saturated Fat penalty (max 15) or Total Fat (max 10) - never both
  if (p.saturatedFat != null) {
    available++;
    if (p.saturatedFat > 10) fatPenalty = 15;
    else if (p.saturatedFat > 5) fatPenalty = 10;
    else if (p.saturatedFat > 3) fatPenalty = 6;
    else if (p.saturatedFat > 1) fatPenalty = 3;
    score -= fatPenalty;
  } else if (p.fat != null) {
    available++;
    if (p.fat > 25) fatPenalty = 10;
    else if (p.fat > 17.5) fatPenalty = 8;
    else if (p.fat > 10) fatPenalty = 5;
    else if (p.fat > 3) fatPenalty = 2;
    score -= fatPenalty;
  }

  // 5. Protein reward (max +10)
  if (p.protein != null) {
    available++;
    if (p.protein >= 20) proteinReward = 10;
    else if (p.protein >= 15) proteinReward = 8;
    else if (p.protein >= 10) proteinReward = 6;
    else if (p.protein >= 5) proteinReward = 3;
    score += proteinReward;
  }

  // 6. Fiber reward (max +15)
  if (p.fiber != null) {
    available++;
    if (p.fiber >= 10) fiberReward = 15;
    else if (p.fiber >= 6) fiberReward = 12;
    else if (p.fiber >= 3) fiberReward = 7;
    else if (p.fiber >= 1.5) fiberReward = 3;
    score += fiberReward;
  }

  // 7. NOVA Processing penalty (max 15)
  if (p.nova != null) {
    available++;
    if (p.nova === 4) processingPenalty = 15;
    else if (p.nova === 3) processingPenalty = 7;
    else if (p.nova === 2) processingPenalty = 3;
    score -= processingPenalty;
  }

  score = Math.round(Math.max(0, Math.min(100, score)));
  const confidence = Math.round((available / total) * 100);

  let label: HealthRatingLabel;
  if (score >= 85) label = 'Excellent';
  else if (score >= 70) label = 'Good';
  else if (score >= 55) label = 'Moderate';
  else if (score >= 40) label = 'Poor';
  else label = 'Very Poor';

  return {
    score,
    confidence,
    label,
    breakdown: {
      caloriePenalty,
      sugarPenalty,
      sodiumPenalty,
      fatPenalty,
      processingPenalty,
      proteinReward,
      fiberReward,
    },
    availableFields: available,
    totalFields: total,
  };
}

export interface ComparisonItemAnalysis {
  id: string;
  name: string;
  brand: string;
  nutrition100g: NutritionData;
  rating: HealthRating;
}

export interface ComparisonVerdict {
  status: 'winner' | 'similar' | 'insufficient_data';
  statement: string;
  details: string[];
  winnerId?: string;
  winnerName?: string;
  topScore?: number;
  scoreDifference?: number;
  badges: Record<string, {
    sugar?: string;
    sodium?: string;
    protein?: string;
    fiber?: string;
    saturatedFat?: string;
    fat?: string;
  }>;
}

/**
 * Compares two or more products side-by-side using NutriDSA Normalized per 100g scoring.
 */
export function generateComparisonVerdict(
  items: ComparisonItemAnalysis[]
): ComparisonVerdict {
  if (items.length === 0) {
    return {
      status: 'insufficient_data',
      statement: 'No items in comparison matrix.',
      details: [],
      badges: {},
    };
  }

  if (items.length === 1) {
    return {
      status: 'similar',
      statement: `Displaying ${items[0].name}. Add another product to compare.`,
      details: [`NutriDSA Score: ${items[0].rating.score}/100 (${items[0].rating.label})`],
      badges: {},
    };
  }

  // Check confidence
  const lowConfidenceItems = items.filter((i) => i.rating.confidence < 50);
  if (lowConfidenceItems.length > 0 && items.length === 2) {
    return {
      status: 'insufficient_data',
      statement: 'Insufficient nutritional information for a reliable definitive winner.',
      details: [
        `Data confidence for ${lowConfidenceItems.map(i => i.name).join(', ')} is under 50%. Compare available metrics in the table below.`
      ],
      badges: computeBadges(items),
    };
  }

  // Sort by health score
  const sorted = [...items].sort((a, b) => b.rating.score - a.rating.score);
  const best = sorted[0];
  const second = sorted[1];
  const diff = best.rating.score - second.rating.score;

  const badges = computeBadges(items);
  const details: string[] = [];

  // Generate specific reasonings
  const bestN = best.nutrition100g;
  const secondN = second.nutrition100g;

  if (bestN.protein != null && secondN.protein != null && bestN.protein > secondN.protein + 1.5) {
    details.push(`Significantly higher protein (+${(bestN.protein - secondN.protein).toFixed(1)}g per 100g)`);
  }
  if (bestN.fiber != null && secondN.fiber != null && bestN.fiber > secondN.fiber + 1) {
    details.push(`More dietary fiber (+${(bestN.fiber - secondN.fiber).toFixed(1)}g per 100g)`);
  }
  if (bestN.sugar != null && secondN.sugar != null && secondN.sugar > bestN.sugar + 2) {
    details.push(`Lower sugar content (${bestN.sugar}g vs ${secondN.sugar}g per 100g)`);
  }
  if (bestN.sodium != null && secondN.sodium != null && secondN.sodium > bestN.sodium + 150) {
    details.push(`Lower sodium (${bestN.sodium}mg vs ${secondN.sodium}mg per 100g)`);
  }
  if (bestN.saturatedFat != null && secondN.saturatedFat != null && secondN.saturatedFat > bestN.saturatedFat + 1.5) {
    details.push(`Less saturated fat (${bestN.saturatedFat}g vs ${secondN.saturatedFat}g per 100g)`);
  }
  if (best.nutrition100g.nova != null && second.nutrition100g.nova != null && best.nutrition100g.nova < second.nutrition100g.nova) {
    details.push(`Less ultra-processed (NOVA Group ${best.nutrition100g.nova} vs ${second.nutrition100g.nova})`);
  }

  if (Math.abs(diff) < 5) {
    return {
      status: 'similar',
      statement: 'Nutritionally similar overall.',
      details: [
        `Scores are within 5 points (${best.name}: ${best.rating.score}/100 vs ${second.name}: ${second.rating.score}/100). Both have comparable nutritional profiles.`,
        ...details
      ],
      scoreDifference: diff,
      badges,
    };
  }

  const statement = `${best.name} is the better overall choice`;
  return {
    status: 'winner',
    statement,
    details: details.length > 0 ? details : [`Higher overall nutrient density and lower penalty deductions (+${diff} pts difference).`],
    winnerId: best.id,
    winnerName: best.name,
    topScore: best.rating.score,
    scoreDifference: diff,
    badges,
  };
}

/**
 * Helper to compute directional badges across items.
 * Rules:
 * - Protein, Fiber: Higher is better
 * - Sugar, Sodium, SaturatedFat, Fat: Lower is better
 * - Only awarded if at least 2 items have valid data and values are meaningfully different.
 */
function computeBadges(items: ComparisonItemAnalysis[]): Record<string, any> {
  const result: Record<string, any> = {};

  items.forEach((i) => {
    result[i.id] = {};
  });

  if (items.length < 2) return result;

  // Protein (Higher is better)
  const proteinValid = items.filter((i) => i.nutrition100g.protein != null);
  if (proteinValid.length >= 2) {
    const max = Math.max(...proteinValid.map((i) => i.nutrition100g.protein!));
    const min = Math.min(...proteinValid.map((i) => i.nutrition100g.protein!));
    if (max - min >= 1) {
      proteinValid.forEach((i) => {
        if (i.nutrition100g.protein === max) result[i.id].protein = '✓ Higher Protein';
      });
    }
  }

  // Fiber (Higher is better)
  const fiberValid = items.filter((i) => i.nutrition100g.fiber != null);
  if (fiberValid.length >= 2) {
    const max = Math.max(...fiberValid.map((i) => i.nutrition100g.fiber!));
    const min = Math.min(...fiberValid.map((i) => i.nutrition100g.fiber!));
    if (max - min >= 0.8) {
      fiberValid.forEach((i) => {
        if (i.nutrition100g.fiber === max) result[i.id].fiber = '✓ Higher Fiber';
      });
    }
  }

  // Sugar (Lower is better)
  const sugarValid = items.filter((i) => i.nutrition100g.sugar != null);
  if (sugarValid.length >= 2) {
    const min = Math.min(...sugarValid.map((i) => i.nutrition100g.sugar!));
    const max = Math.max(...sugarValid.map((i) => i.nutrition100g.sugar!));
    if (max - min >= 1) {
      sugarValid.forEach((i) => {
        if (i.nutrition100g.sugar === min) result[i.id].sugar = '✓ Lower Sugar';
      });
    }
  }

  // Sodium (Lower is better)
  const sodiumValid = items.filter((i) => i.nutrition100g.sodium != null);
  if (sodiumValid.length >= 2) {
    const min = Math.min(...sodiumValid.map((i) => i.nutrition100g.sodium!));
    const max = Math.max(...sodiumValid.map((i) => i.nutrition100g.sodium!));
    if (max - min >= 50) {
      sodiumValid.forEach((i) => {
        if (i.nutrition100g.sodium === min) result[i.id].sodium = '✓ Lower Sodium';
      });
    }
  }

  // Saturated Fat (Lower is better)
  const satFatValid = items.filter((i) => i.nutrition100g.saturatedFat != null);
  if (satFatValid.length >= 2) {
    const min = Math.min(...satFatValid.map((i) => i.nutrition100g.saturatedFat!));
    const max = Math.max(...satFatValid.map((i) => i.nutrition100g.saturatedFat!));
    if (max - min >= 0.8) {
      satFatValid.forEach((i) => {
        if (i.nutrition100g.saturatedFat === min) result[i.id].saturatedFat = '✓ Less Saturated Fat';
      });
    }
  } else {
    // Total Fat fallback
    const fatValid = items.filter((i) => i.nutrition100g.fat != null);
    if (fatValid.length >= 2) {
      const min = Math.min(...fatValid.map((i) => i.nutrition100g.fat!));
      const max = Math.max(...fatValid.map((i) => i.nutrition100g.fat!));
      if (max - min >= 1.5) {
        fatValid.forEach((i) => {
          if (i.nutrition100g.fat === min) result[i.id].fat = '✓ Lower Fat';
        });
      }
    }
  }

  return result;
}
