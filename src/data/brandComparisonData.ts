import { Category, Product, NutritionalInfo, AllergenInfo, DiabeticInfo } from '@/types/food';
import maggiImg from "@/assets/foods/maggi-noodles.png";
import amulButterImg from "@/assets/foods/amul-butter.png";
import hideSeekImg from "@/assets/foods/hide-seek.png";
import kurkureImg from "@/assets/foods/kurkure.png";
import tropicanaImg from "@/assets/foods/tropicana.png";
import masalaDosaImg from "@/assets/foods/masala-dosa.jpg";
import idliImg from "@/assets/foods/idli.jpg";
import pohaImg from "@/assets/foods/poha.jpg";
import upmaImg from "@/assets/foods/upma.jpg";
import meduVadaImg from "@/assets/foods/medu-vada.jpg";
import palakPaneerImg from "@/assets/foods/palak-paneer.jpg";
import rajmaChawalImg from "@/assets/foods/rajma-chawal.jpg";
import kadhaiPaneerImg from "@/assets/foods/kadhai-paneer.jpg";
import dhoklaImg from "@/assets/foods/dhokla.jpg";
import dalTadkaImg from "@/assets/foods/dal-tadka.jpg";
import springRollsImg from "@/assets/foods/spring-rolls.jpg";
import vadaPavImg from "@/assets/foods/vada-pav.jpg";
import choleBhatureImg from "@/assets/foods/chole-bhature.jpg";

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
  price: 15,
  image: maggiImg
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
  price: 12,
  image: "https://budgetbazaar.online/wp-content/uploads/2023/01/BBP2178.jpg"
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
  price: 18,
  image: "https://www.bbassets.com/media/uploads/p/l/40001627_9-top-ramen-noodles-masala.jpg"
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
  price: 20,
  image: "https://assets.unileversolutions.com/v1/36462809.png"
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
  price: 25,
  image: "https://www.jiomart.com/images/product/original/491264336/britannia-little-hearts-classic-biscuits-70-g-product-images-o491264336-p491264336-0-202501122156.jpg?im=Resize=(1000,1000)"
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
  price: 45,
  image: "https://m.media-amazon.com/images/I/81ZffmFqsDL._AC_UF894,1000_QL80_.jpg"
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
  price: 10,
  image: 'https://www.chai-masala.co.uk/wp-content/uploads/2021/12/paele-G-a-scaled.jpg'
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
  price: 15,
  image: 'https://www.quickpantry.in/cdn/shop/products/britannia-good-day-cashew-cookies-100-g-quick-pantry.jpg?v=1710538215'
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
  price: 20,
  image: 'https://www.quickpantry.in/cdn/shop/products/lay-s-spanish-tomato-tango-potato-chips-32-g-quick-pantry.jpg?v=1710538823'
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

// Hide & Seek Data
const hideSeekProduct: Product = {
  id: 'hide-seek-cookies',
  name: 'Hide & Seek Biscuits',
  brand: 'Parle',
  category: 'Biscuits & Cookies',
  ingredients: ['Wheat Flour', 'Chocolate Chips', 'Sugar', 'Vegetable Oil'],
  nutrition: createNutrition({
    calories: 480,
    protein: 6,
    carbohydrates: 72,
    fat: 20,
    fiber: 2,
    sugar: 25,
    sodium: 250,
    cholesterol: 0
  }),
  allergens: createAllergens({ gluten: true, soy: true }),
  diabetic: createDiabetic({
    glycemicIndex: 78,
    sugarContent: 25,
    carbohydrateCount: 72,
    isDiabeticFriendly: false,
    warnings: ['High sugar content', 'High glycemic index']
  }),
  servingSize: '100g',
  price: 30,
  image: "http://themintleaves.com/cdn/shop/products/Parle-Hide-seek_7c34205a-0202-4777-83d3-5041c2884dfb_1200x1200.png?v=1619599543"
};

// Kurkure Data
const kurkureProduct: Product = {
  id: 'kurkure-masala',
  name: 'Kurkure Masala Munch',
  brand: 'Kurkure',
  category: 'Chips & Salty Snacks',
  ingredients: ['Rice Meal', 'Corn Meal', 'Gram Meal', 'Edible Vegetable Oil', 'Spices'],
  nutrition: createNutrition({
    calories: 270,
    protein: 3,
    carbohydrates: 30,
    fat: 15,
    fiber: 1,
    sugar: 2,
    sodium: 600,
    cholesterol: 0
  }),
  allergens: createAllergens({}),
  diabetic: createDiabetic({
    glycemicIndex: 65,
    sugarContent: 2,
    carbohydrateCount: 30,
    isDiabeticFriendly: false,
    warnings: ['High sodium content', 'High fat content']
  }),
  servingSize: '50g',
  price: 20,
  image: 'https://m.media-amazon.com/images/I/71LyKlizpuL._AC_UF894,1000_QL80_.jpg'
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
  price: 30,
  image: "https://www.bigbasket.com/media/uploads/p/m/40307753_6-cadbury-dairy-milk-chocolate-bar.jpg"
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
  price: 25,
  image: "https://www.bbassets.com/media/uploads/p/l/40122230_15-nestle-kitkat-crispy-wafer-bar.jpg"
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
  price: 80,
  image: "https://www.bbassets.com/media/uploads/p/l/251018_9-kelloggs-corn-flakes.jpg"
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
  price: 120,
  image: "https://www.bbassets.com/media/uploads/p/l/40170230_5-bagrrys-crunchy-muesli-fruit-nut-with-cranberry.jpg"
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

const redBull: Product = {
  id: 'red-bull',
  name: 'Red Bull Energy Drink',
  brand: 'Red Bull',
  category: 'Soft Drinks & Juices',
  ingredients: ['Carbonated Water', 'Sugar', 'Caffeine', 'Taurine', 'B-Vitamins'],
  nutrition: createNutrition({
    calories: 110,
    protein: 1,
    carbohydrates: 28,
    fat: 0,
    fiber: 0,
    sugar: 27,
    sodium: 40,
    cholesterol: 0
  }),
  allergens: createAllergens({}),
  diabetic: createDiabetic({
    glycemicIndex: 95,
    sugarContent: 27,
    carbohydrateCount: 28,
    isDiabeticFriendly: false,
    warnings: ['High caffeine content', 'Very high sugar content']
  }),
  servingSize: '250ml',
  price: 110,
  image: "https://images-eu.ssl-images-amazon.com/images/I/51Bp30CR3IL._AC_UL210_SR210,210_.jpg"
};

const yakult: Product = {
  id: 'yakult',
  name: 'Yakult Probiotic Drink',
  brand: 'Yakult',
  category: 'Soft Drinks & Juices',
  ingredients: ['Water', 'Skimmed Milk Power', 'Sugar', 'Lactobacillus casei Shirota'],
  nutrition: createNutrition({
    calories: 50,
    protein: 1.5,
    carbohydrates: 11,
    fat: 0,
    fiber: 0,
    sugar: 10,
    sodium: 15,
    cholesterol: 0
  }),
  allergens: createAllergens({ dairy: true }),
  diabetic: createDiabetic({
    glycemicIndex: 45,
    sugarContent: 10,
    carbohydrateCount: 11,
    isDiabeticFriendly: true,
    warnings: ['Contains added sugar']
  }),
  servingSize: '65ml',
  price: 80,
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Yakult_drink.jpg/250px-Yakult_drink.jpg"
};

const realOrangeJuice: Product = {
  id: 'real-orange-juice',
  name: 'Real Orange Juice',
  brand: 'Real',
  category: 'Soft Drinks & Juices',
  ingredients: ['Water', 'Orange Juice Concentrate', 'Sugar', 'Vitamin C'],
  nutrition: createNutrition({
    calories: 45,
    protein: 0.5,
    carbohydrates: 11,
    fat: 0,
    fiber: 0,
    sugar: 11,
    sodium: 10,
    cholesterol: 0
  }),
  allergens: createAllergens({}),
  diabetic: createDiabetic({
    glycemicIndex: 50,
    sugarContent: 11,
    carbohydrateCount: 11,
    isDiabeticFriendly: true,
    warnings: ['Natural fruit sugars', 'Moderate glycemic index']
  }),
  servingSize: '1L',
  price: 40,
  image: "https://www.bbassets.com/media/uploads/p/l/229910_8-real-fruit-power-juice-orange.jpg"
};

const realMixedFruit: Product = {
  id: 'real-mixed-fruit',
  name: 'Real Mixed Fruit Juice',
  brand: 'Real',
  category: 'Soft Drinks & Juices',
  ingredients: ['Water', 'Mixed Fruit Concentrate', 'Sugar', 'Acidity Regulator'],
  nutrition: createNutrition({
    calories: 48,
    protein: 0.5,
    carbohydrates: 12,
    fat: 0,
    fiber: 0.5,
    sugar: 11,
    sodium: 15,
    cholesterol: 0
  }),
  allergens: createAllergens({}),
  diabetic: createDiabetic({
    glycemicIndex: 52,
    sugarContent: 11,
    carbohydrateCount: 12,
    isDiabeticFriendly: true,
    warnings: ['Natural fruit sugars', 'Moderate glycemic index']
  }),
  servingSize: '1L',
  price: 45,
  image: "https://cdn.zeptonow.com/production/tr:w-312,ar-2000-2000,pr-true,f-auto,,q-40/cms/product_variant/239ba2e5-7652-4ab1-8e76-e80316cb01e8.jpeg"
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
  price: 6,
  image: "https://www.vrindasupermart.in/wp-content/uploads/2021/08/306926-2_4-amul-homogenised-toned-milk-e1628691620898.jpg"
};

const amulButter: Product = {
  id: 'amul-butter',
  name: 'Amul Butter',
  brand: 'Amul',
  category: 'Dairy Products (Packed)',
  ingredients: ['Butter', 'Salt', 'Milk Solids'],
  nutrition: createNutrition({
    calories: 720,
    protein: 0.5,
    carbohydrates: 0,
    fat: 80,
    fiber: 0,
    sugar: 0,
    sodium: 800,
    cholesterol: 215
  }),
  allergens: createAllergens({ dairy: true }),
  diabetic: createDiabetic({
    glycemicIndex: 0,
    sugarContent: 0,
    carbohydrateCount: 0,
    isDiabeticFriendly: true,
    warnings: ['High fat content', 'High sodium']
  }),
  servingSize: '100g',
  price: 55,
  image: "https://m.media-amazon.com/images/I/717GgfVk6YL._AC_UF894,1000_QL80_.jpg"
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
  price: 25,
  image: "https://m.media-amazon.com/images/I/51NlT7TEhCL._AC_UF894,1000_QL80_.jpg"
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

const kissanKetchup: Product = {
  id: 'kissan-ketchup',
  name: 'Kissan Tomato Ketchup',
  brand: 'Kissan',
  category: 'Condiments & Sauces',
  ingredients: ['Water', 'Tomato Paste', 'Sugar', 'Salt', 'Acidity Regulator', 'Spices'],
  nutrition: createNutrition({
    calories: 121,
    protein: 1,
    carbohydrates: 29,
    fat: 0,
    fiber: 0.5,
    sugar: 28,
    sodium: 900,
    cholesterol: 1
  }),
  allergens: createAllergens({}),
  diabetic: createDiabetic({
    glycemicIndex: 55,
    sugarContent: 28,
    carbohydrateCount: 29,
    isDiabeticFriendly: false,
    warnings: ['High sugar content', 'High sodium']
  }),
  servingSize: '15g',
  price: 155,
  image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/gyhnhupu6h6mc6ixmplv"
};

const maggiKetchup: Product = {
  id: 'maggi-ketchup',
  name: 'Maggi Tomato Ketchup',
  brand: 'Maggi',
  category: 'Condiments & Sauces',
  ingredients: ['Water', 'Tomato Paste', 'Sugar', 'Salt', 'Spices', 'Onion Powder'],
  nutrition: createNutrition({
    calories: 100,
    protein: 1,
    carbohydrates: 24,
    fat: 0,
    fiber: 1,
    sugar: 20,
    sodium: 800,
    cholesterol: 0
  }),
  allergens: createAllergens({}),
  diabetic: createDiabetic({
    glycemicIndex: 55,
    sugarContent: 20,
    carbohydrateCount: 24,
    isDiabeticFriendly: false,
    warnings: ['Contains sugar', 'High sodium']
  }),
  servingSize: '15g',
  price: 90,
  image: "https://www.quickpantry.in/cdn/shop/files/Maggi_Tomato_Ketchup_Bottle_1_kg_Quick_Pantry.jpg?v=1745148482"
};

const horlicks: Product = {
  id: 'horlicks',
  name: 'Horlicks Health Drink',
  brand: 'Horlicks',
  category: 'Health Drinks',
  ingredients: ['Malt Extract', 'Wheat Flour', 'Milk Solids', 'Sugar', 'Salt', 'Minerals', 'Vitamins'],
  nutrition: createNutrition({
    calories: 380,
    protein: 14,
    carbohydrates: 75,
    fat: 3,
    fiber: 4,
    sugar: 30,
    sodium: 150,
    cholesterol: 8
  }),
  allergens: createAllergens({ gluten: true, dairy: true }),
  diabetic: createDiabetic({
    glycemicIndex: 65,
    sugarContent: 30,
    carbohydrateCount: 75,
    isDiabeticFriendly: false,
    warnings: ['High sugar content', 'High carbohydrate']
  }),
  servingSize: '27g',
  price: 200,
  image: "https://www.bbassets.com/media/uploads/p/l/119384_16-horlicks-health-nutrition-drink-classic-malt.jpg"
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
        products: [hideSeekProduct]
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
        products: [realOrangeJuice, realMixedFruit]
      },
      {
        id: 'red-bull',
        name: 'Red Bull',
        products: [redBull]
      },
      {
        id: 'yakult',
        name: 'Yakult',
        products: [yakult]
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
        products: [amulMilk, amulButter]
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
  },
  {
    id: 'condiments',
    name: 'Condiments & Sauces',
    description: 'Sauces, ketchups, and seasonings',
    brands: [
      {
        id: 'kissan',
        name: 'Kissan',
        products: [kissanKetchup]
      },
      {
        id: 'maggi-ketchup',
        name: 'Maggi',
        products: [maggiKetchup]
      }
    ]
  },
  {
    id: 'health-drinks',
    name: 'Health Drinks',
    description: 'Supplemental nutrition drinks',
    brands: [
      {
        id: 'horlicks',
        name: 'Horlicks',
        products: [horlicks]
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
