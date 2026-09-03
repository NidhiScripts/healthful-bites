import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { toast } from 'sonner';

export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type HealthGoal = 'lose' | 'maintain' | 'gain';

export interface UserBodyMetrics {
  weight: number;       // in kg
  height: number;       // in cm
  age: number;          // in years
  gender: Gender;
  activityLevel: ActivityLevel;
  goal: HealthGoal;
  allergies: string[];
}

export interface LoggedFoodItem {
  id: string;
  foodId?: string;
  name: string;
  brand?: string;
  image?: string;
  servingSize?: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  quantity: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
  loggedAt: string;
}

export interface DailyNutritionTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  waterLiters: number;
}

export interface NutritionSummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
}

export interface RemainingNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

interface DietContextType {
  bodyMetrics: UserBodyMetrics;
  updateBodyMetrics: (updates: Partial<UserBodyMetrics>) => void;
  bmi: number;
  bmiCategory: string;
  bmiColor: string;
  bmr: number;
  tdee: number;
  dailyTargets: DailyNutritionTargets;
  loggedItems: LoggedFoodItem[];
  addFoodToLog: (
    food: {
      id?: string;
      name: string;
      brand?: string;
      image?: string;
      servingSize?: string;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      fiber?: number;
      sodium?: number;
      mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    },
    quantity?: number
  ) => void;
  removeFoodFromLog: (logId: string) => void;
  updateLoggedQuantity: (logId: string, quantity: number) => void;
  clearTodayLog: () => void;
  consumed: NutritionSummary;
  remaining: RemainingNutrition;
}

const DEFAULT_METRICS: UserBodyMetrics = {
  weight: 68,
  height: 172,
  age: 26,
  gender: 'male',
  activityLevel: 'moderate',
  goal: 'maintain',
  allergies: ['peanuts'],
};

const METRICS_STORAGE_KEY = 'healthfood_user_body_metrics';

const getTodayKey = () => {
  const today = new Date().toISOString().split('T')[0];
  return `healthfood_daily_log_${today}`;
};

const DietContext = createContext<DietContextType | undefined>(undefined);

export const DietProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. User Body Metrics State
  const [bodyMetrics, setBodyMetrics] = useState<UserBodyMetrics>(() => {
    try {
      const stored = localStorage.getItem(METRICS_STORAGE_KEY);
      return stored ? { ...DEFAULT_METRICS, ...JSON.parse(stored) } : DEFAULT_METRICS;
    } catch {
      return DEFAULT_METRICS;
    }
  });

  // 2. Today's Logged Foods (Starts empty: 0 items)
  const [loggedItems, setLoggedItems] = useState<LoggedFoodItem[]>(() => {
    try {
      const stored = localStorage.getItem(getTodayKey());
      if (stored) {
        const parsed: LoggedFoodItem[] = JSON.parse(stored);
        // Clean out any old mock seed items
        return parsed.filter(item => !item.id.startsWith('seed_'));
      }
      return [];
    } catch {
      return [];
    }
  });

  // Save metrics
  const updateBodyMetrics = (updates: Partial<UserBodyMetrics>) => {
    setBodyMetrics((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(METRICS_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      toast.success('Body metrics & targets recalculated!');
      return next;
    });
  };

  // Save daily logs
  useEffect(() => {
    try {
      localStorage.setItem(getTodayKey(), JSON.stringify(loggedItems));
    } catch (e) {
      console.error(e);
    }
  }, [loggedItems]);

  // 3. BMI Calculation
  const { bmi, bmiCategory, bmiColor } = useMemo(() => {
    const heightInMeters = bodyMetrics.height / 100;
    if (heightInMeters <= 0 || bodyMetrics.weight <= 0) {
      return { bmi: 22, bmiCategory: 'Normal Weight', bmiColor: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    }
    const val = Math.round((bodyMetrics.weight / (heightInMeters * heightInMeters)) * 10) / 10;
    if (val < 18.5) {
      return { bmi: val, bmiCategory: 'Underweight', bmiColor: 'text-amber-700 bg-amber-50 border-amber-200' };
    }
    if (val < 25) {
      return { bmi: val, bmiCategory: 'Normal Weight', bmiColor: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
    if (val < 30) {
      return { bmi: val, bmiCategory: 'Overweight', bmiColor: 'text-orange-700 bg-orange-50 border-orange-200' };
    }
    return { bmi: val, bmiCategory: 'Obese', bmiColor: 'text-rose-700 bg-rose-50 border-rose-200' };
  }, [bodyMetrics.weight, bodyMetrics.height]);

  // 4. BMR, TDEE, & Daily Targets Calculation
  const { bmr, tdee, dailyTargets } = useMemo(() => {
    const { weight, height, age, gender, activityLevel, goal } = bodyMetrics;

    // Mifflin-St Jeor Equation
    let baseBmr: number;
    if (gender === 'female') {
      baseBmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      baseBmr = 10 * weight + 6.25 * height - 5 * age + 5;
    }
    baseBmr = Math.round(baseBmr);

    const activityMultipliers: Record<ActivityLevel, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    const calculatedTdee = Math.round(baseBmr * (activityMultipliers[activityLevel] || 1.55));

    // Goal adjustment
    let targetCalories = calculatedTdee;
    if (goal === 'lose') {
      targetCalories = Math.max(1200, calculatedTdee - 450); // Safe deficit
    } else if (goal === 'gain') {
      targetCalories = calculatedTdee + 350; // Lean surplus
    }

    // Protein Target: ~1.8g per kg for active/muscle, ~1.4g for maintain
    const proteinFactor = goal === 'gain' ? 2.0 : goal === 'lose' ? 1.8 : 1.5;
    const targetProtein = Math.round(weight * proteinFactor);

    // Fat Target: ~25-30% of total daily calories
    const targetFat = Math.round((targetCalories * 0.25) / 9);

    // Carbs Target: Remainder calories / 4
    const remainingCaloriesForCarbs = Math.max(0, targetCalories - (targetProtein * 4 + targetFat * 9));
    const targetCarbs = Math.round(remainingCaloriesForCarbs / 4);

    // Fiber Target: ~14g per 1000 kcal
    const targetFiber = Math.round((targetCalories / 1000) * 14);

    // Water Target (Liters): ~35ml per kg bodyweight
    const waterLiters = Math.round((weight * 0.035) * 10) / 10;

    return {
      bmr: baseBmr,
      tdee: calculatedTdee,
      dailyTargets: {
        calories: targetCalories,
        protein: targetProtein,
        carbs: targetCarbs,
        fat: targetFat,
        fiber: targetFiber,
        waterLiters,
      },
    };
  }, [bodyMetrics]);

  // 5. Consumed Totals
  const consumed: NutritionSummary = useMemo(() => {
    return loggedItems.reduce(
      (acc, item) => {
        const q = item.quantity || 1;
        return {
          calories: acc.calories + Math.round(item.calories * q),
          protein: Math.round((acc.protein + item.protein * q) * 10) / 10,
          carbs: Math.round((acc.carbs + item.carbs * q) * 10) / 10,
          fat: Math.round((acc.fat + item.fat * q) * 10) / 10,
          fiber: Math.round((acc.fiber + item.fiber * q) * 10) / 10,
          sodium: acc.sodium + Math.round(item.sodium * q),
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0 }
    );
  }, [loggedItems]);

  // 6. Remaining Nutrition (Target - Consumed)
  const remaining: RemainingNutrition = useMemo(() => {
    return {
      calories: Math.max(0, dailyTargets.calories - consumed.calories),
      protein: Math.max(0, Math.round((dailyTargets.protein - consumed.protein) * 10) / 10),
      carbs: Math.max(0, Math.round((dailyTargets.carbs - consumed.carbs) * 10) / 10),
      fat: Math.max(0, Math.round((dailyTargets.fat - consumed.fat) * 10) / 10),
      fiber: Math.max(0, Math.round((dailyTargets.fiber - consumed.fiber) * 10) / 10),
    };
  }, [dailyTargets, consumed]);

  // Actions
  const addFoodToLog = (
    food: {
      id?: string;
      name: string;
      brand?: string;
      image?: string;
      servingSize?: string;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      fiber?: number;
      sodium?: number;
      mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    },
    quantity: number = 1
  ) => {
    const newItem: LoggedFoodItem = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      foodId: food.id,
      name: food.name,
      brand: food.brand,
      image: food.image,
      servingSize: food.servingSize,
      mealType: food.mealType || 'snack',
      quantity,
      calories: food.calories || 0,
      protein: food.protein || 0,
      carbs: food.carbs || 0,
      fat: food.fat || 0,
      fiber: food.fiber || 0,
      sodium: food.sodium || 0,
      loggedAt: new Date().toISOString(),
    };

    setLoggedItems((prev) => [newItem, ...prev]);
    toast.success(`Logged "${food.name}" into your diet tracker! Remaining nutrients updated.`);
  };

  const removeFoodFromLog = (logId: string) => {
    setLoggedItems((prev) => {
      const item = prev.find((i) => i.id === logId);
      if (item) {
        toast.info(`Removed "${item.name}" from today's log.`);
      }
      return prev.filter((i) => i.id !== logId);
    });
  };

  const updateLoggedQuantity = (logId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFoodFromLog(logId);
      return;
    }
    setLoggedItems((prev) =>
      prev.map((i) => (i.id === logId ? { ...i, quantity } : i))
    );
  };

  const clearTodayLog = () => {
    setLoggedItems([]);
    toast.info("Cleared today's food log.");
  };

  return (
    <DietContext.Provider
      value={{
        bodyMetrics,
        updateBodyMetrics,
        bmi,
        bmiCategory,
        bmiColor,
        bmr,
        tdee,
        dailyTargets,
        loggedItems,
        addFoodToLog,
        removeFoodFromLog,
        updateLoggedQuantity,
        clearTodayLog,
        consumed,
        remaining,
      }}
    >
      {children}
    </DietContext.Provider>
  );
};

export const useDiet = () => {
  const context = useContext(DietContext);
  if (!context) {
    throw new Error('useDiet must be used within DietProvider');
  }
  return context;
};
