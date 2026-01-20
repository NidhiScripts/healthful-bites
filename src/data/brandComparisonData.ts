import { Category, Product, NutritionalInfo, AllergenInfo, DiabeticInfo } from '@/types/food';

// Sample nutritional data for common products
const createNutrition = (data: Partial<NutritionalInfo>): NutritionalInfo => ({
  calories: 0,
  protein: 0, // g
  carbohydrates: 0, // g
  fat: 0, // g
  fiber: 0, // g
  sugar: 0, // g
  sodium: 0, // mg
  cholesterol: 0, // mg
  ...data
});

const createAllergens = (data: Partial<AllergenInfo>): AllergenInfo => ({
  gluten: false,
  dairy: false,
  nuts: false,
  soy: false,
  eggs: false,
  shellfish: false,
  ...data
});

const createDiabetic = (data: Partial<DiabeticInfo>): DiabeticInfo => ({
  glycemicIndex: 50,
  sugarContent: 0, // g
  carbohydrateCount: 0, // g
  isDiabeticFriendly: true,
  warnings: [],
  ...data
});

// Instant Noodles Data
const maggiProduct: Product = {
  id: 'maggi-2min',
  name: 'Maggi 2-Minute Noodles',
  brand: 'Maggi',
  category: 'Instant Noodles',
  ingredients: ['Refined Wheat Flour', 'Palm Oil', 'Salt', 'Minerals', 'Flavor Enhancers'],
  nutrition: createNutrition({
    calories: 380,
    protein: 8,
    carbohydrates: 56,
    fat: 15,
    fiber: 2,
    sugar: 2,
    sodium: 850,
    cholesterol: 0
  }),
  allergens: createAllergens({ gluten: true }),
  diabetic: createDiabetic({
    glycemicIndex: 75,
    sugarContent: 2,
    carbohydrateCount: 56,
    isDiabeticFriendly: false,
    warnings: ['High sodium content', 'High glycemic index']
  }),
  servingSize: '70g',
  price: 15
};

const yippeeProduct: Product = {
  id: 'yippee-classic',
  name: 'Yippee Classic Noodles',
  brand: 'Yippee',
  category: 'Instant Noodles',
  ingredients: ['Refined Wheat Flour', 'Palm Oil', 'Salt', 'Acid Regulators', 'Minerals'],
  nutrition: createNutrition({
    calories: 390,
    protein: 7,
    carbohydrates: 58,
    fat: 16,
    fiber: 1.5,
    sugar: 1.8,
    sodium: 820,
    cholesterol: 0
  }),
  allergens: createAllergens({ gluten: true }),
  diabetic: createDiabetic({
    glycemicIndex: 72,
    sugarContent: 1.8,
    carbohydrateCount: 58,
    isDiabeticFriendly: false,
    warnings: ['High sodium content', 'High glycemic index']
  }),
  servingSize: '70g',
  price: 12
};

const topRamenProduct: Product = {
  id: 'topramen-chicken',
  name: 'Top Ramen Chicken Flavor',
  brand: 'Top Ramen',
  category: 'Instant Noodles',
  ingredients: ['Wheat Flour', 'Palm Oil', 'Salt', 'Chicken Powder', 'Spices'],
  nutrition: createNutrition({
    calories: 370,
    protein: 9,
    carbohydrates: 54,
    fat: 14,
    fiber: 2.2,
    sugar: 2.5,
    sodium: 780,
    cholesterol: 5
  }),
  allergens: createAllergens({ gluten: true }),
  diabetic: createDiabetic({
    glycemicIndex: 70,
    sugarContent: 2.5,
    carbohydrateCount: 54,
    isDiabeticFriendly: false,
    warnings: ['High sodium content', 'Moderate glycemic index']
  }),
  servingSize: '85g',
  price: 18
};

const knorrProduct: Product = {
  id: 'knorr-veg',
  name: 'Knorr Vegetable Noodles',
  brand: 'Knorr',
  category: 'Instant Noodles',
  ingredients: ['Wheat Flour', 'Vegetable Powder', 'Palm Oil', 'Salt', 'Spices'],
  nutrition: createNutrition({
    calories: 360,
    protein: 8.5,
    carbohydrates: 52,
    fat: 13,
    fiber: 3,
    sugar: 3,
    sodium: 750,
    cholesterol: 0
  }),
  allergens: createAllergens({ gluten: true }),
  diabetic: createDiabetic({
    glycemicIndex: 68,
    sugarContent: 3,
    carbohydrateCount: 52,
    isDiabeticFriendly: false,
    warnings: ['High sodium content', 'Moderate glycemic index']
  }),
  servingSize: '75g',
  price: 20
};

// Cakes & Pastries Data
const britanniaLittleHearts: Product = {
  id: 'britannia-little-hearts',
  name: 'Britannia Little Hearts',
  brand: 'Britannia',
  category: 'Cakes & Pastries (Packed)',
  ingredients: ['Wheat Flour', 'Sugar', 'Palm Oil', 'Milk Solids', 'Leavening Agents'],
  nutrition: createNutrition({
    calories: 420,
    protein: 4,
    carbohydrates: 65,
    fat: 18,
    fiber: 1,
    sugar: 28,
    sodium: 180,
    cholesterol: 8
  }),
  allergens: createAllergens({ gluten: true, dairy: true }),
  diabetic: createDiabetic({
    glycemicIndex: 80,
    sugarContent: 28,
    carbohydrateCount: 65,
    isDiabeticFriendly: false,
    warnings: ['Very high sugar content', 'High glycemic index']
  }),
  servingSize: '30g',
  price: 25
};

const monginisCake: Product = {
  id: 'monginis-vanilla',
  name: 'Monginis Vanilla Cake Slice',
  brand: 'Monginis',
  category: 'Cakes & Pastries (Packed)',
  ingredients: ['Wheat Flour', 'Sugar', 'Butter', 'Eggs', 'Milk', 'Vanilla Flavor'],
  nutrition: createNutrition({
    calories: 280,
    protein: 3,
    carbohydrates: 35,
    fat: 15,
    fiber: 0.5,
    sugar: 20,
    sodium: 120,
    cholesterol: 25
  }),
  allergens: createAllergens({ gluten: true, dairy: true, eggs: true }),
  diabetic: createDiabetic({
    glycemicIndex: 75,
    sugarContent: 20,
    carbohydrateCount: 35,
    isDiabeticFriendly: false,
    warnings: ['High sugar content', 'High glycemic index']
  }),
  servingSize: '50g',
  price: 45
};

// Biscuits & Cookies Data
const parleG: Product = {
  id: 'parle-g',
  name: 'Parle-G Glucose Biscuits',
  brand: 'Parle',
  category: 'Biscuits & Cookies',
  ingredients: ['Wheat Flour', 'Sugar', 'Palm Oil', 'Milk Solids', 'Leavening Agents'],
  nutrition: createNutrition({
    calories: 380,
    protein: 6,
    carbohydrates: 72,
    fat: 8,
    fiber: 1.5,
    sugar: 18,
    sodium: 150,
    cholesterol: 2
  }),
  allergens: createAllergens({ gluten: true, dairy: true }),
  diabetic: createDiabetic({
    glycemicIndex: 70,
    sugarContent: 18,
    carbohydrateCount: 72,
    isDiabeticFriendly: false,
    warnings: ['High sugar content', 'High glycemic index']
  }),
  servingSize: '50g',
  price: 10
};

const goodDay: Product = {
  id: 'goodday-butter',
  name: 'Good Day Butter Biscuits',
  brand: 'Good Day',
  category: 'Biscuits & Cookies',
  ingredients: ['Wheat Flour', 'Sugar', 'Butter', 'Milk Solids', 'Salt'],
  nutrition: createNutrition({
    calories: 420,
    protein: 4,
    carbohydrates: 58,
    fat: 20,
    fiber: 1,
    sugar: 15,
    sodium: 140,
    cholesterol: 12
  }),
  allergens: createAllergens({ gluten: true, dairy: true }),
  diabetic: createDiabetic({
    glycemicIndex: 65,
    sugarContent: 15,
    carbohydrateCount: 58,
    isDiabeticFriendly: false,
    warnings: ['High sugar content', 'Moderate glycemic index']
  }),
  servingSize: '45g',
  price: 15
};

// Chips & Salty Snacks Data
const laysClassic: Product = {
  id: 'lays-classic',
  name: 'Lays Classic Potato Chips',
  brand: 'Lays',
  category: 'Chips & Salty Snacks',
  ingredients: ['Potatoes', 'Vegetable Oil', 'Salt'],
  nutrition: createNutrition({
    calories: 160,
    protein: 2,
    carbohydrates: 15,
    fat: 10,
    fiber: 1,
    sugar: 0.5,
    sodium: 170,
    cholesterol: 0
  }),
  allergens: createAllergens({}),
  diabetic: createDiabetic({
    glycemicIndex: 55,
    sugarContent: 0.5,
    carbohydrateCount: 15,
    isDiabeticFriendly: true,
    warnings: ['High sodium content']
  }),
  servingSize: '30g',
  price: 20
};

const bingoMadAngles: Product = {
  id: 'bingo-mad-angles',
  name: 'Bingo Mad Angles',
  brand: 'Bingo',
  category: 'Chips & Salty Snacks',
  ingredients: ['Rice Flour', 'Corn Starch', 'Vegetable Oil', 'Salt', 'Spices'],
  nutrition: createNutrition({
    calories: 180,
    protein: 2.5,
    carbohydrates: 18,
    fat: 11,
    fiber: 1.2,
    sugar: 1,
    sodium: 200,
    cholesterol: 0
  }),
  allergens: createAllergens({}),
  diabetic: createDiabetic({
    glycemicIndex: 60,
    sugarContent: 1,
    carbohydrateCount: 18,
    isDiabeticFriendly: true,
    warnings: ['High sodium content']
  }),
  servingSize: '35g',
  price: 18
};

// Chocolates Data
const dairyMilk: Product = {
  id: 'dairy-milk',
  name: 'Dairy Milk Chocolate',
  brand: 'Dairy Milk',
  category: 'Chocolates',
  ingredients: ['Milk Solids', 'Sugar', 'Cocoa Butter', 'Cocoa Solids', 'Emulsifiers'],
  nutrition: createNutrition({
    calories: 230,
    protein: 3,
    carbohydrates: 26,
    fat: 13,
    fiber: 1,
    sugar: 23,
    sodium: 25,
    cholesterol: 8
  }),
  allergens: createAllergens({ dairy: true }),
  diabetic: createDiabetic({
    glycemicIndex: 85,
    sugarContent: 23,
    carbohydrateCount: 26,
    isDiabeticFriendly: false,
    warnings: ['Very high sugar content', 'Very high glycemic index']
  }),
  servingSize: '20g',
  price: 30
};

const kitKat: Product = {
  id: 'kitkat',
  name: 'KitKat Chocolate',
  brand: 'KitKat',
  category: 'Chocolates',
  ingredients: ['Wheat Flour', 'Sugar', 'Milk Solids', 'Cocoa Butter', 'Cocoa Solids'],
  nutrition: createNutrition({
    calories: 210,
    protein: 2.5,
    carbohydrates: 24,
    fat: 11,
    fiber: 0.8,
    sugar: 20,
    sodium: 30,
    cholesterol: 6
  }),
  allergens: createAllergens({ gluten: true, dairy: true }),
  diabetic: createDiabetic({
    glycemicIndex: 80,
    sugarContent: 20,
    carbohydrateCount: 24,
    isDiabeticFriendly: false,
    warnings: ['Very high sugar content', 'High glycemic index']
  }),
  servingSize: '17.5g',
  price: 25
};

// Breakfast Cereals Data
const kelloggsCornFlakes: Product = {
  id: 'kelloggs-corn-flakes',
  name: "Kellogg's Corn Flakes",
  brand: "Kellogg's",
  category: 'Breakfast Cereals',
  ingredients: ['Milled Corn', 'Sugar', 'Malt Flavoring', 'Salt'],
  nutrition: createNutrition({
    calories: 100,
    protein: 2,
    carbohydrates: 24,
    fat: 0.1,
    fiber: 1,
    sugar: 3,
    sodium: 200,
    cholesterol: 0
  }),
  allergens: createAllergens({}),
  diabetic: createDiabetic({
    glycemicIndex: 85,
    sugarContent: 3,
    carbohydrateCount: 24,
    isDiabeticFriendly: false,
    warnings: ['Very high glycemic index', 'High sodium']
  }),
  servingSize: '30g',
  price: 80
};

const bagrrysMuesli: Product = {
  id: 'bagrrys-muesli',
  name: "Bagrry's Muesli",
  brand: "Bagrry's",
  category: 'Breakfast Cereals',
  ingredients: ['Rolled Oats', 'Honey', 'Nuts', 'Dried Fruits', 'Wheat Flakes'],
  nutrition: createNutrition({
    calories: 120,
    protein: 4,
    carbohydrates: 22,
    fat: 3,
    fiber: 4,
    sugar: 8,
    sodium: 50,
    cholesterol: 0
  }),
  allergens: createAllergens({ nuts: true, gluten: true }),
  diabetic: createDiabetic({
    glycemicIndex: 55,
    sugarContent: 8,
    carbohydrateCount: 22,
    isDiabeticFriendly: true,
    warnings: ['Contains honey', 'Contains nuts']
  }),
  servingSize: '40g',
  price: 120
};

// Soft Drinks & Juices Data
const cocaCola: Product = {
  id: 'coca-cola',
  name: 'Coca-Cola',
  brand: 'Coca-Cola',
  category: 'Soft Drinks & Juices',
  ingredients: ['Carbonated Water', 'Sugar', 'Caffeine', 'Phosphoric Acid', 'Natural Flavors'],
  nutrition: createNutrition({
    calories: 140,
    protein: 0,
    carbohydrates: 39,
    fat: 0,
    fiber: 0,
    sugar: 39,
    sodium: 15,
    cholesterol: 0
  }),
  allergens: createAllergens({}),
  diabetic: createDiabetic({
    glycemicIndex: 90,
    sugarContent: 39,
    carbohydrateCount: 39,
    isDiabeticFriendly: false,
    warnings: ['Extremely high sugar content', 'Very high glycemic index']
  }),
  servingSize: '355ml',
  price: 25
};

const pepsi: Product = {
  id: 'pepsi',
  name: 'Pepsi',
  brand: 'Pepsi',
  category: 'Soft Drinks & Juices',
  ingredients: ['Carbonated Water', 'Sugar', 'Caffeine', 'Phosphoric Acid', 'Natural Flavors'],
  nutrition: createNutrition({
    calories: 150,
    protein: 0,
    carbohydrates: 41,
    fat: 0,
    fiber: 0,
    sugar: 41,
    sodium: 15,
    cholesterol: 0
  }),
  allergens: createAllergens({}),
  diabetic: createDiabetic({
    glycemicIndex: 90,
    sugarContent: 41,
    carbohydrateCount: 41,
    isDiabeticFriendly: false,
    warnings: ['Extremely high sugar content', 'Very high glycemic index']
  }),
  servingSize: '355ml',
  price: 25
};

// Dairy Products Data
const amulMilk: Product = {
  id: 'amul-milk',
  name: 'Amul Toned Milk',
  brand: 'Amul',
  category: 'Dairy Products (Packed)',
  ingredients: ['Milk', 'Vitamins', 'Minerals'],
  nutrition: createNutrition({
    calories: 47,
    protein: 3.2,
    carbohydrates: 4.8,
    fat: 1.5,
    fiber: 0,
    sugar: 4.8,
    sodium: 50,
    cholesterol: 5
  }),
  allergens: createAllergens({ dairy: true }),
  diabetic: createDiabetic({
    glycemicIndex: 35,
    sugarContent: 4.8,
    carbohydrateCount: 4.8,
    isDiabeticFriendly: true,
    warnings: []
  }),
  servingSize: '100ml',
  price: 6
};

const motherDairyYogurt: Product = {
  id: 'mother-dairy-yogurt',
  name: 'Mother Dairy Yogurt',
  brand: 'Mother Dairy',
  category: 'Dairy Products (Packed)',
  ingredients: ['Milk', 'Yogurt Cultures', 'Sugar', 'Fruit Pulp'],
  nutrition: createNutrition({
    calories: 80,
    protein: 3.5,
    carbohydrates: 12,
    fat: 2.5,
    fiber: 0.5,
    sugar: 11,
    sodium: 40,
    cholesterol: 8
  }),
  allergens: createAllergens({ dairy: true }),
  diabetic: createDiabetic({
    glycemicIndex: 45,
    sugarContent: 11,
    carbohydrateCount: 12,
    isDiabeticFriendly: true,
    warnings: ['Contains added sugar']
  }),
  servingSize: '100g',
  price: 25
};

// Ready-to-Eat Foods Data
const mtrUpma: Product = {
  id: 'mtr-upma',
  name: 'MTR Ready to Eat Upma',
  brand: 'MTR',
  category: 'Ready-to-Eat Foods',
  ingredients: ['Semolina', 'Onions', 'Green Chillies', 'Vegetable Oil', 'Spices'],
  nutrition: createNutrition({
    calories: 180,
    protein: 4,
    carbohydrates: 28,
    fat: 6,
    fiber: 2,
    sugar: 2,
    sodium: 320,
    cholesterol: 0
  }),
  allergens: createAllergens({ gluten: true }),
  diabetic: createDiabetic({
    glycemicIndex: 65,
    sugarContent: 2,
    carbohydrateCount: 28,
    isDiabeticFriendly: false,
    warnings: ['High sodium content', 'Moderate glycemic index']
  }),
  servingSize: '100g',
  price: 40
};

const haldiramsSamosa: Product = {
  id: 'haldirams-samosa',
  name: 'Haldiram Frozen Samosa',
  brand: "Haldiram's",
  category: 'Ready-to-Eat Foods',
  ingredients: ['Wheat Flour', 'Potatoes', 'Peas', 'Vegetable Oil', 'Spices'],
  nutrition: createNutrition({
    calories: 160,
    protein: 3,
    carbohydrates: 18,
    fat: 8,
    fiber: 2.5,
    sugar: 1.5,
    sodium: 280,
    cholesterol: 0
  }),
  allergens: createAllergens({ gluten: true }),
  diabetic: createDiabetic({
    glycemicIndex: 60,
    sugarContent: 1.5,
    carbohydrateCount: 18,
    isDiabeticFriendly: true,
    warnings: ['High sodium content']
  }),
  servingSize: '80g',
  price: 35
};

// Ice Creams Data
const kwalityWalls: Product = {
  id: 'kwality-walls-vanilla',
  name: 'Kwality Walls Vanilla Ice Cream',
  brand: 'Kwality Walls',
  category: 'Ice Creams (Packed)',
  ingredients: ['Milk Solids', 'Sugar', 'Vegetable Oil', 'Stabilizers', 'Vanilla Flavor'],
  nutrition: createNutrition({
    calories: 137,
    protein: 2,
    carbohydrates: 16,
    fat: 7,
    fiber: 0.5,
    sugar: 14,
    sodium: 40,
    cholesterol: 15
  }),
  allergens: createAllergens({ dairy: true }),
  diabetic: createDiabetic({
    glycemicIndex: 60,
    sugarContent: 14,
    carbohydrateCount: 16,
    isDiabeticFriendly: false,
    warnings: ['High sugar content']
  }),
  servingSize: '100ml',
  price: 45
};

const vadilalIceCream: Product = {
  id: 'vadilal-mango',
  name: 'Vadilal Mango Ice Cream',
  brand: 'Vadilal',
  category: 'Ice Creams (Packed)',
  ingredients: ['Milk Solids', 'Sugar', 'Mango Pulp', 'Vegetable Oil', 'Stabilizers'],
  nutrition: createNutrition({
    calories: 145,
    protein: 2.2,
    carbohydrates: 18,
    fat: 7.5,
    fiber: 0.3,
    sugar: 16,
    sodium: 35,
    cholesterol: 18
  }),
  allergens: createAllergens({ dairy: true }),
  diabetic: createDiabetic({
    glycemicIndex: 65,
    sugarContent: 16,
    carbohydrateCount: 18,
    isDiabeticFriendly: false,
    warnings: ['High sugar content']
  }),
  servingSize: '100ml',
  price: 40
};

export const foodCategories: Category[] = [
  {
    id: 'instant-noodles',
    name: 'Instant Noodles',
    description: 'Quick and easy noodle preparations',
    brands: [
      {
        id: 'maggi',
        name: 'Maggi',
        products: [maggiProduct]
      },
      {
        id: 'yippee',
        name: 'Yippee',
        products: [yippeeProduct]
      },
      {
        id: 'top-ramen',
        name: 'Top Ramen',
        products: [topRamenProduct]
      },
      {
        id: 'knorr',
        name: 'Knorr',
        products: [knorrProduct]
      }
    ]
  },
  {
    id: 'cakes-pastries',
    name: 'Cakes & Pastries (Packed)',
    description: 'Sweet baked goods and pastries',
    brands: [
      {
        id: 'britannia',
        name: 'Britannia',
        products: [britanniaLittleHearts]
      },
      {
        id: 'monginis',
        name: 'Monginis',
        products: [monginisCake]
      },
      {
        id: 'elite',
        name: 'Elite',
        products: []
      },
      {
        id: 'lotte',
        name: 'Lotte',
        products: []
      }
    ]
  },
  {
    id: 'biscuits-cookies',
    name: 'Biscuits & Cookies',
    description: 'Sweet and savory biscuits',
    brands: [
      {
        id: 'parle',
        name: 'Parle',
        products: [parleG]
      },
      {
        id: 'good-day',
        name: 'Good Day',
        products: [goodDay]
      },
      {
        id: 'oreo',
        name: 'Oreo',
        products: []
      },
      {
        id: 'hide-seek',
        name: 'Hide & Seek',
        products: []
      }
    ]
  },
  {
    id: 'chips-snacks',
    name: 'Chips & Salty Snacks',
    description: 'Savory crunchy snacks',
    brands: [
      {
        id: 'lays',
        name: 'Lays',
        products: [laysClassic]
      },
      {
        id: 'bingo',
        name: 'Bingo',
        products: [bingoMadAngles]
      },
      {
        id: 'kurkure',
        name: 'Kurkure',
        products: []
      },
      {
        id: 'uncle-chipps',
        name: 'Uncle Chipps',
        products: []
      }
    ]
  },
  {
    id: 'chocolates',
    name: 'Chocolates',
    description: 'Sweet chocolate treats',
    brands: [
      {
        id: 'dairy-milk',
        name: 'Dairy Milk',
        products: [dairyMilk]
      },
      {
        id: 'kitkat',
        name: 'KitKat',
        products: [kitKat]
      },
      {
        id: 'perk',
        name: 'Perk',
        products: []
      },
      {
        id: 'ferrero-rocher',
        name: 'Ferrero Rocher',
        products: []
      }
    ]
  },
  {
    id: 'breakfast-cereals',
    name: 'Breakfast Cereals',
    description: 'Morning breakfast options',
    brands: [
      {
        id: 'kelloggs',
        name: "Kellogg's",
        products: [kelloggsCornFlakes]
      },
      {
        id: 'bagrrys',
        name: "Bagrry's",
        products: [bagrrysMuesli]
      },
      {
        id: 'yoga-bar',
        name: 'Yoga Bar',
        products: []
      },
      {
        id: 'nestle',
        name: 'Nestlé',
        products: []
      }
    ]
  },
  {
    id: 'soft-drinks',
    name: 'Soft Drinks & Juices',
    description: 'Beverages and drinks',
    brands: [
      {
        id: 'coca-cola',
        name: 'Coca-Cola',
        products: [cocaCola]
      },
      {
        id: 'pepsi',
        name: 'Pepsi',
        products: [pepsi]
      },
      {
        id: 'real',
        name: 'Real',
        products: []
      },
      {
        id: 'tropicana',
        name: 'Tropicana',
        products: []
      }
    ]
  },
  {
    id: 'dairy-products',
    name: 'Dairy Products (Packed)',
    description: 'Milk and dairy products',
    brands: [
      {
        id: 'amul',
        name: 'Amul',
        products: [amulMilk]
      },
      {
        id: 'mother-dairy',
        name: 'Mother Dairy',
        products: [motherDairyYogurt]
      },
      {
        id: 'heritage',
        name: 'Heritage',
        products: []
      },
      {
        id: 'nandini',
        name: 'Nandini',
        products: []
      }
    ]
  },
  {
    id: 'ready-to-eat',
    name: 'Ready-to-Eat Foods',
    description: 'Convenient ready-to-eat meals',
    brands: [
      {
        id: 'mtr',
        name: 'MTR',
        products: [mtrUpma]
      },
      {
        id: 'haldirams',
        name: "Haldiram's",
        products: [haldiramsSamosa]
      },
      {
        id: 'itc-kitchens',
        name: 'ITC Kitchens of India',
        products: []
      },
      {
        id: 'gits',
        name: 'Gits',
        products: []
      }
    ]
  },
  {
    id: 'ice-creams',
    name: 'Ice Creams (Packed)',
    description: 'Frozen desserts and ice creams',
    brands: [
      {
        id: 'kwality-walls',
        name: 'Kwality Walls',
        products: [kwalityWalls]
      },
      {
        id: 'vadilal',
        name: 'Vadilal',
        products: [vadilalIceCream]
      },
      {
        id: 'amul-ice-cream',
        name: 'Amul Ice Cream',
        products: []
      },
      {
        id: 'cream-bell',
        name: 'Cream Bell',
        products: []
      }
    ]
  }
];

export const getAllProducts = (): Product[] => {
  return foodCategories.flatMap(category =>
    category.brands.flatMap(brand => brand.products)
  );
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  const category = foodCategories.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  return category.brands.flatMap(brand => brand.products);
};

export const getProductById = (id: string): Product | undefined => {
  return getAllProducts().find(product => product.id === id);
};
