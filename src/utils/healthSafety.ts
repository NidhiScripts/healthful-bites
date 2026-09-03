import { UnifiedProduct } from '@/api/productService';

export interface UserHealthPreferences {
  dietary: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    lactoseFree: boolean;
  };
  nutrition: {
    lowSugar: boolean;
    lowSodium: boolean;
    highProtein: boolean;
    lowFat: boolean;
  };
  allergens: {
    peanuts: boolean;
    treeNuts: boolean;
    milk: boolean;
    eggs: boolean;
    soy: boolean;
    gluten: boolean;
  };
}

export const DEFAULT_USER_PREFERENCES: UserHealthPreferences = {
  dietary: {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    lactoseFree: false,
  },
  nutrition: {
    lowSugar: true,
    lowSodium: true,
    highProtein: false,
    lowFat: false,
  },
  allergens: {
    peanuts: false,
    treeNuts: false,
    milk: false,
    eggs: false,
    soy: false,
    gluten: false,
  },
};

export interface HealthWarning {
  id: string;
  type: 'high_sugar' | 'high_sodium' | 'high_fat' | 'ultra_processed' | 'allergen' | 'preference_mismatch';
  severity: 'warning' | 'caution' | 'info';
  title: string;
  message: string;
}

export const evaluateHealthWarnings = (
  product: UnifiedProduct,
  userPrefs: UserHealthPreferences = DEFAULT_USER_PREFERENCES
): HealthWarning[] => {
  const warnings: HealthWarning[] = [];
  const nutrition = product.nutrition;
  const ingredientsStr = (product.ingredients || []).join(' ').toLowerCase();
  const allergensList = (product.allergens || []).map(a => a.toLowerCase());

  if (!nutrition && !product.ingredients) {
    return warnings;
  }

  // 1. High Sugar Threshold (>10g per 100g)
  if (nutrition?.sugar !== undefined && nutrition.sugar > 10) {
    const isPrefMismatch = userPrefs.nutrition.lowSugar;
    warnings.push({
      id: 'high_sugar',
      type: 'high_sugar',
      severity: isPrefMismatch ? 'warning' : 'caution',
      title: '⚠ High Sugar',
      message: isPrefMismatch
        ? `Contains ${nutrition.sugar}g sugar per 100g, which may not align with your Low Sugar preference.`
        : `Contains ${nutrition.sugar}g sugar per 100g.`
    });
  }

  // 2. High Sodium Threshold (>500mg per 100g)
  if (nutrition?.sodium !== undefined && nutrition.sodium > 500) {
    const isPrefMismatch = userPrefs.nutrition.lowSodium;
    warnings.push({
      id: 'high_sodium',
      type: 'high_sodium',
      severity: isPrefMismatch ? 'warning' : 'caution',
      title: '⚠ High Sodium',
      message: isPrefMismatch
        ? `Contains ${nutrition.sodium}mg sodium per 100g, which may not align with your Low Sodium preference.`
        : `Contains ${nutrition.sodium}mg sodium per 100g.`
    });
  }

  // 3. High Saturated Fat (>5g per 100g) or High Fat (>15g per 100g)
  if (nutrition?.saturatedFat !== undefined && nutrition.saturatedFat > 5) {
    warnings.push({
      id: 'high_sat_fat',
      type: 'high_fat',
      severity: 'caution',
      title: '⚠ High Saturated Fat',
      message: `Contains ${nutrition.saturatedFat}g saturated fat per 100g.`
    });
  } else if (nutrition?.fat !== undefined && nutrition.fat > 17.5) {
    warnings.push({
      id: 'high_fat',
      type: 'high_fat',
      severity: 'caution',
      title: '⚠ High Fat',
      message: `Contains ${nutrition.fat}g total fat per 100g.`
    });
  }

  // 4. Ultra-Processed Food (NOVA 4)
  if (product.novaGroup === 4) {
    warnings.push({
      id: 'nova_4',
      type: 'ultra_processed',
      severity: 'caution',
      title: '⚠ Ultra-Processed Food',
      message: 'Classified as NOVA 4 (ultra-processed food product).'
    });
  }

  // 5. Allergen Checks
  const checkAllergen = (key: keyof UserHealthPreferences['allergens'], name: string, keywords: string[]) => {
    if (userPrefs.allergens[key]) {
      const hasAllergen = keywords.some(kw => ingredientsStr.includes(kw) || allergensList.some(a => a.includes(kw)));
      if (hasAllergen) {
        warnings.push({
          id: `allergen_${key}`,
          type: 'allergen',
          severity: 'warning',
          title: `⚠ Contains ${name}`,
          message: `This product contains ${name.toLowerCase()}, which conflicts with your saved allergen profile.`
        });
      }
    }
  };

  checkAllergen('peanuts', 'Peanuts', ['peanut', 'groundnut']);
  checkAllergen('treeNuts', 'Tree Nuts', ['almond', 'walnut', 'cashew', 'hazelnut', 'pistachio', 'pecan']);
  checkAllergen('milk', 'Milk / Dairy', ['milk', 'whey', 'casein', 'cream', 'butter', 'lactose', 'cheese']);
  checkAllergen('eggs', 'Eggs', ['egg', 'albumin', 'yolk']);
  checkAllergen('soy', 'Soy', ['soy', 'soya', 'lecithin']);
  checkAllergen('gluten', 'Gluten', ['wheat', 'barley', 'rye', 'gluten', 'oat']);

  // 6. Dietary Preference Checks (Vegan / Vegetarian / Gluten Free / Lactose Free)
  if (userPrefs.dietary.vegan) {
    const animalProducts = ['milk', 'whey', 'casein', 'butter', 'cheese', 'egg', 'honey', 'meat', 'chicken', 'beef', 'pork', 'fish', 'gelatin'];
    const matches = animalProducts.filter(ap => ingredientsStr.includes(ap) || allergensList.some(a => a.includes(ap)));
    if (matches.length > 0) {
      warnings.push({
        id: 'pref_vegan',
        type: 'preference_mismatch',
        severity: 'warning',
        title: '⚠ Non-Vegan Ingredients Detected',
        message: `Contains (${matches.join(', ')}), which may not align with your Vegan preference.`
      });
    }
  }

  if (userPrefs.dietary.lactoseFree) {
    const dairyItems = ['milk', 'whey', 'lactose', 'butter', 'cream', 'cheese'];
    const matches = dairyItems.filter(di => ingredientsStr.includes(di) || allergensList.some(a => a.includes(di)));
    if (matches.length > 0 && !warnings.some(w => w.id === 'allergen_milk')) {
      warnings.push({
        id: 'pref_lactose',
        type: 'preference_mismatch',
        severity: 'warning',
        title: '⚠ Contains Dairy / Lactose',
        message: `May not align with your Lactose-Free preference.`
      });
    }
  }

  return warnings;
};
