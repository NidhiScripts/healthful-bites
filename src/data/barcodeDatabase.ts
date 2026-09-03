// Mock barcode database with product information
// In a real application, this would connect to a barcode API service like Open Food Facts
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
import bhelPuriImg from "@/assets/foods/bhel-puri_user.jpg";
import paniPuriImg from "@/assets/foods/pani-puri_user.jpg";
import alooTikkiImg from "@/assets/foods/aloo-tikki_user.jpg";
import dahiPuriImg from "@/assets/foods/dahi-puri_user.jpg";
import springRollsImg from "@/assets/foods/spring-rolls.jpg";
import kachoriImg from "@/assets/foods/kachori_user.jpg";
import vadaPavImg from "@/assets/foods/vada-pav.jpg";
import amulButterImg from "@/assets/foods/amul-butter.png";
import hideSeekImg from "@/assets/foods/hide-seek.png";
import kurkureImg from "@/assets/foods/kurkure.png";
import maggiImg from "@/assets/foods/maggi-noodles.png";
import tropicanaImg from "@/assets/foods/tropicana.png";
export interface BarcodeProduct {
  barcode: string;
  name: string;
  brand: string;
  category: string;
  nutrition: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
  price: number;
  image?: string;
  ingredients?: string[];
  allergens?: string[];
  servingSize?: string;
}

export const barcodeDatabase: BarcodeProduct[] = [
  // Instant Noodles
  {
    barcode: "8901058000269",
    name: "Maggi 2-Minute Noodles",
    brand: "Maggi",
    category: "Instant Noodles",
    nutrition: {
      calories: 380,
      protein: 8,
      carbohydrates: 56,
      fat: 15,
      fiber: 2,
      sugar: 2,
      sodium: 850
    },
    price: 15,
    image: maggiImg,
    ingredients: ["Refined Wheat Flour", "Edible Vegetable Oil", "Salt", "Minerals", "Spices"],
    allergens: ["Wheat", "Soy"],
    servingSize: "70g"
  },
  {
    barcode: "8901737100115",
    name: "Yippee Classic Noodles",
    brand: "Yippee",
    category: "Instant Noodles",
    nutrition: {
      calories: 390,
      protein: 7,
      carbohydrates: 58,
      fat: 16,
      fiber: 1.5,
      sugar: 1.8,
      sodium: 820
    },
    price: 15,
    image: "https://www.bbassets.com/media/uploads/p/l/287006_25-sunfeast-yippee-noodles-magic-masala.jpg",
    ingredients: ["Refined Wheat Flour", "Palm Oil", "Salt", "Wheat Gluten", "Mineral"],
    allergens: ["Wheat"],
    servingSize: "65g"
  },
  {
    barcode: "8901088000147",
    name: "Top Ramen Chicken Flavor",
    brand: "Top Ramen",
    category: "Instant Noodles",
    nutrition: {
      calories: 380,
      protein: 8,
      carbohydrates: 56,
      fat: 14,
      fiber: 2,
      sugar: 2,
      sodium: 790
    },
    price: 20,
    image: "https://www.bbassets.com/media/uploads/p/l/40001627_9-top-ramen-noodles-masala.jpg",
    ingredients: ["Noodles", "Chicken Flavor Powder", "Vegetables", "Seasoning"],
    allergens: ["Wheat", "Soy"],
    servingSize: "70g"
  },
  {
    barcode: "8901036000123",
    name: "Knorr Vegetable Noodles",
    brand: "Knorr",
    category: "Instant Noodles",
    nutrition: {
      calories: 350,
      protein: 7,
      carbohydrates: 60,
      fat: 12,
      fiber: 3,
      sugar: 3,
      sodium: 750
    },
    price: 25,
    image: "https://assets.unileversolutions.com/v1/36462809.png",
    ingredients: ["Noodles", "Vegetable Mix", "Spices", "Seasoning"],
    allergens: ["Wheat"],
    servingSize: "75g"
  },

  // Biscuits
  {
    barcode: "8901769200118",
    name: "Parle-G Glucose Biscuits",
    brand: "Parle",
    category: "Biscuits & Cookies",
    nutrition: {
      calories: 380,
      protein: 6,
      carbohydrates: 72,
      fat: 8,
      fiber: 1.5,
      sugar: 18,
      sodium: 150
    },
    price: 30,
    image: "https://www.chai-masala.co.uk/wp-content/uploads/2021/12/paele-G-a-scaled.jpg",
    ingredients: ["Wheat Flour", "Sugar", "Edible Vegetable Oil", "Chocolate Chips", "Cocoa Solids", "Leavening Agents"],
    allergens: ["Wheat", "Milk"],
    servingSize: "100g"
  },
  {
    barcode: "8901769200119",
    name: "Good Day Butter Biscuits",
    brand: "Good Day",
    category: "Biscuits & Cookies",
    nutrition: {
      calories: 420,
      protein: 4,
      carbohydrates: 58,
      fat: 20,
      fiber: 1,
      sugar: 15,
      sodium: 140
    },
    price: 15,
    image: "https://www.quickpantry.in/cdn/shop/products/britannia-good-day-cashew-cookies-100-g-quick-pantry.jpg?v=1710538215",
    ingredients: ["Refined Wheat Flour", "Sugar", "Butter", "Milk Solids", "Salt"],
    allergens: ["Wheat", "Milk", "Butter"],
    servingSize: "100g"
  },
  {
    barcode: "8901058860153",
    name: "Hide & Seek Biscuits",
    brand: "Parle",
    category: "Biscuits & Cookies",
    nutrition: {
      calories: 480,
      protein: 6,
      carbohydrates: 72,
      fat: 20,
      fiber: 2,
      sugar: 25,
      sodium: 250
    },
    price: 20,
    image: "http://themintleaves.com/cdn/shop/products/Parle-Hide-seek_7c34205a-0202-4777-83d3-5041c2884dfb_1200x1200.png?v=1619599543",
    ingredients: ["Wheat Flour", "Chocolate Chips", "Sugar", "Vegetable Oil"],
    allergens: ["Wheat", "Soy"],
    servingSize: "100g"
  },
  {
    barcode: "8901063000128",
    name: "Bourbon Biscuits",
    brand: "Britannia",
    category: "Biscuits & Cookies",
    nutrition: {
      calories: 500,
      protein: 6,
      carbohydrates: 75,
      fat: 22,
      fiber: 1.5,
      sugar: 30,
      sodium: 200
    },
    price: 30,
    image: "https://www.bbassets.com/media/uploads/p/l/263593_28-britannia-bourbon-chocolate-cream-biscuits.jpg",
    ingredients: ["Wheat Flour", "Sugar", "Vegetable Fat", "Cocoa Solids"],
    allergens: ["Wheat", "Milk"],
    servingSize: "100g"
  },
  {
    barcode: "7622210888686",
    name: "Oreo Biscuits",
    brand: "Oreo",
    category: "Biscuits & Cookies",
    nutrition: {
      calories: 480,
      protein: 4,
      carbohydrates: 71,
      fat: 21,
      fiber: 1,
      sugar: 35,
      sodium: 450
    },
    price: 30,
    image: "https://cdn.shopaccino.com/edible-smart/products/cadbury-oreo-creme-biscuit---vanilla-313899_l.jpg?v=651",
    ingredients: ["Wheat Flour", "Sugar", "Palm Oil", "Cocoa Powder"],
    allergens: ["Wheat", "Soy"],
    servingSize: "100g"
  },

  // Chips
  {
    barcode: "8901769200120",
    name: "Lays Classic Potato Chips",
    brand: "Lays",
    category: "Chips & Salty Snacks",
    nutrition: {
      calories: 160,
      protein: 2,
      carbohydrates: 15,
      fat: 10,
      fiber: 1,
      sugar: 0.5,
      sodium: 170
    },
    price: 20,
    image: "https://www.quickpantry.in/cdn/shop/products/lay-s-spanish-tomato-tango-potato-chips-32-g-quick-pantry.jpg?v=1710538823",
    ingredients: ["Potatoes", "Edible Vegetable Oil", "Salt"],
    allergens: ["None"],
    servingSize: "30g"
  },
  {
    barcode: "8901769200121",
    name: "Bingo Mad Angles",
    brand: "Bingo",
    category: "Chips & Salty Snacks",
    nutrition: {
      calories: 180,
      protein: 2.5,
      carbohydrates: 18,
      fat: 11,
      fiber: 1.2,
      sugar: 1,
      sodium: 200
    },
    price: 20,
    image: "https://m.media-amazon.com/images/I/81R07cM4UrL.jpg",
    ingredients: ["Rice Meal", "Edible Vegetable Oil", "Corn Meal", "Gram Meal", "Spices", "Condiments"],
    allergens: ["None"],
    servingSize: "28g"
  },
  {
    barcode: "8901491101967",
    name: "Kurkure Masala Munch",
    brand: "Kurkure",
    category: "Chips & Salty Snacks",
    nutrition: {
      calories: 270,
      protein: 3,
      carbohydrates: 30,
      fat: 15,
      fiber: 1,
      sugar: 2,
      sodium: 600
    },
    price: 20,
    image: "https://m.media-amazon.com/images/I/71LyKlizpuL._AC_UF894,1000_QL80_.jpg",
    ingredients: ["Rice Meal", "Corn Meal", "Gram Meal", "Edible Vegetable Oil", "Spices"],
    allergens: ["None"],
    servingSize: "50g"
  },
  {
    barcode: "8101491101968",
    name: "Haldiram Bhujia",
    brand: "Haldiram",
    category: "Chips & Salty Snacks",
    nutrition: {
      calories: 320,
      protein: 7,
      carbohydrates: 40,
      fat: 18,
      fiber: 1,
      sugar: 1,
      sodium: 750
    },
    price: 35,
    image: "https://www.haldirams.com/media/catalog/product/cache/71134970afb779eb7860339989626b7e/b/l/blu08127_1.jpg",
    ingredients: ["Gram Flour", "Moth Flour", "Edible Vegetable Oil", "Spices", "Salt"],
    allergens: ["None"],
    servingSize: "50g"
  },

  // Chocolates
  {
    barcode: "8901769200122",
    name: "Dairy Milk Chocolate",
    brand: "Dairy Milk",
    category: "Chocolates",
    nutrition: {
      calories: 230,
      protein: 3,
      carbohydrates: 26,
      fat: 13,
      fiber: 1,
      sugar: 23,
      sodium: 25
    },
    price: 30,
    image: "https://www.bigbasket.com/media/uploads/p/m/40307753_6-cadbury-dairy-milk-chocolate-bar.jpg",
    ingredients: ["Milk Solids", "Sugar", "Cocoa Butter", "Cocoa Solids", "Emulsifiers"],
    allergens: ["Milk", "Soy"],
    servingSize: "20g"
  },
  {
    barcode: "8901769200123",
    name: "KitKat Chocolate",
    brand: "KitKat",
    category: "Chocolates",
    nutrition: {
      calories: 210,
      protein: 2.5,
      carbohydrates: 24,
      fat: 11,
      fiber: 0.8,
      sugar: 20,
      sodium: 30
    },
    price: 25,
    image: "https://www.bbassets.com/media/uploads/p/l/40122230_15-nestle-kitkat-crispy-wafer-bar.jpg",
    ingredients: ["Milk Solids", "Sugar", "Wheat Flour", "Cocoa Butter", "Cocoa Solids"],
    allergens: ["Milk", "Wheat", "Soy"],
    servingSize: "17.5g"
  },

  // Soft Drinks
  {
    barcode: "8901769200124",
    name: "Coca-Cola",
    brand: "Coca-Cola",
    category: "Soft Drinks & Juices",
    nutrition: {
      calories: 140,
      protein: 0,
      carbohydrates: 39,
      fat: 0,
      fiber: 0,
      sugar: 39,
      sodium: 15
    },
    price: 25,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop&auto=format",
    ingredients: ["Carbonated Water", "Sugar", "Caffeine", "Phosphoric Acid", "Natural Flavors"],
    allergens: ["None"],
    servingSize: "330ml"
  },
  {
    barcode: "8901769200125",
    name: "Pepsi",
    brand: "Pepsi",
    category: "Soft Drinks & Juices",
    nutrition: {
      calories: 150,
      protein: 0,
      carbohydrates: 41,
      fat: 0,
      fiber: 0,
      sugar: 41,
      sodium: 15
    },
    price: 25,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop&auto=format",
    ingredients: ["Carbonated Water", "Sugar", "Caffeine", "Phosphoric Acid", "Natural Flavors"],
    allergens: ["None"],
    servingSize: "330ml"
  },
  {
    barcode: "8902047101014",
    name: "Tropicana Orange Juice",
    brand: "Tropicana",
    category: "Soft Drinks & Juices",
    nutrition: {
      calories: 90,
      protein: 1,
      carbohydrates: 22,
      fat: 0,
      fiber: 0.5,
      sugar: 20,
      sodium: 10
    },
    price: 40,
    image: tropicanaImg,
    ingredients: ["Water", "Orange Juice Concentrate", "Sugar"],
    allergens: ["None"],
    servingSize: "200ml"
  },
  {
    barcode: "8901233010115",
    name: "Real Mixed Fruit Juice",
    brand: "Real",
    category: "Soft Drinks & Juices",
    nutrition: {
      calories: 100,
      protein: 0.5,
      carbohydrates: 25,
      fat: 0,
      fiber: 0.5,
      sugar: 23,
      sodium: 15
    },
    price: 45,
    image: "https://images.unsplash.com/photo-1621506289937-9cd14d003d3b?w=400&h=300&fit=crop&auto=format",
    ingredients: ["Water", "Mixed Fruit Concentrate", "Sugar", "Acidity Regulator"],
    allergens: ["None"],
    servingSize: "200ml"
  },
  {
    barcode: "9002470001927",
    name: "Red Bull Energy Drink",
    brand: "Red Bull",
    category: "Soft Drinks & Juices",
    nutrition: {
      calories: 110,
      protein: 1,
      carbohydrates: 28,
      fat: 0,
      fiber: 0,
      sugar: 27,
      sodium: 40
    },
    price: 110,
    image: "https://images-eu.ssl-images-amazon.com/images/I/51Bp30CR3IL._AC_UL210_SR210,210_.jpg",
    ingredients: ["Carbonated Water", "Sugar", "Caffeine", "Taurine", "B-Vitamins"],
    allergens: ["None"],
    servingSize: "250ml"
  },
  {
    barcode: "8906001370014",
    name: "Yakult Probiotic Drink",
    brand: "Yakult",
    category: "Soft Drinks & Juices",
    nutrition: {
      calories: 50,
      protein: 1.5,
      carbohydrates: 11,
      fat: 0,
      fiber: 0,
      sugar: 10,
      sodium: 15
    },
    price: 80,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Yakult_drink.jpg/250px-Yakult_drink.jpg",
    ingredients: ["Water", "Skimmed Milk Power", "Sugar", "Lactobacillus casei strain Shirota"],
    allergens: ["Milk"],
    servingSize: "65ml"
  },
  {
    barcode: "8901769200126",
    name: "Amul Toned Milk",
    brand: "Amul",
    category: "Dairy Products (Packed)",
    nutrition: {
      calories: 47,
      protein: 3.2,
      carbohydrates: 4.8,
      fat: 1.5,
      fiber: 0,
      sugar: 4.8,
      sodium: 50
    },
    price: 6,
    image: "https://www.vrindasupermart.in/wp-content/uploads/2021/08/306926-2_4-amul-homogenised-toned-milk-e1628691620898.jpg",
    ingredients: ["Toned Milk", "Vitamin A", "Vitamin D"],
    allergens: ["Milk"],
    servingSize: "100ml"
  },
  {
    barcode: "8901769200127",
    name: "Mother Dairy Yogurt",
    brand: "Mother Dairy",
    category: "Dairy Products (Packed)",
    nutrition: {
      calories: 80,
      protein: 3.5,
      carbohydrates: 12,
      fat: 2.5,
      fiber: 0.5,
      sugar: 11,
      sodium: 40
    },
    price: 25,
    image: "https://m.media-amazon.com/images/I/51NlT7TEhCL._AC_UF894,1000_QL80_.jpg",
    ingredients: ["Milk", "Live Cultures", "Sugar", "Fruit Pulp"],
    allergens: ["Milk"],
    servingSize: "100g"
  },
  {
    barcode: "8901262010018",
    name: "Amul Butter",
    brand: "Amul",
    category: "Dairy Products (Packed)",
    nutrition: {
      calories: 100,
      protein: 0,
      carbohydrates: 0,
      fat: 11,
      fiber: 0,
      sugar: 0,
      sodium: 800
    },
    price: 55,
    image: "https://m.media-amazon.com/images/I/717GgfVk6YL._AC_UF894,1000_QL80_.jpg",
    ingredients: ["Milk Fat", "Salt", "Milk Solids", "Annatto Color"],
    allergens: ["Milk", "Butter"],
    servingSize: "14g"
  },
  // User Requested Fallbacks
  {
    barcode: "8901499025951",
    name: "Kellogg's Muesli - Fruit & Nut",
    brand: "Kellogg's",
    category: "Breakfast Cereals",
    nutrition: {
      calories: 395,
      protein: 8.5,
      carbohydrates: 76,
      fat: 6.2,
      fiber: 5.5,
      sugar: 18,
      sodium: 150
    },
    price: 340,
    image: "https://images.unsplash.com/photo-1511381939415-c1c0d0e6c7b5?w=400&h=300&fit=crop&auto=format",
    ingredients: ["Multigrains", "Dried Fruits", "Nuts", "Sugar", "Cereal Extract"],
    allergens: ["Wheat", "Nuts", "Gluten"],
    servingSize: "40g"
  },
  {
    barcode: "8901088133559",
    name: "Saffola Masala Oats",
    brand: "Saffola",
    category: "Breakfast Cereals",
    nutrition: {
      calories: 387,
      protein: 10,
      carbohydrates: 67,
      fat: 9,
      fiber: 7,
      sugar: 2,
      sodium: 780
    },
    price: 20,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&auto=format",
    ingredients: ["Oats", "Maltodextrin", "Salt", "Spices", "Dehydrated Vegetables"],
    allergens: ["Oats"],
    servingSize: "38g"
  },
  {
    barcode: "8901030350481",
    name: "Kissan Tomato Ketchup",
    brand: "Kissan",
    category: "Condiments & Sauces",
    nutrition: {
      calories: 121,
      protein: 1,
      carbohydrates: 29,
      fat: 0,
      fiber: 0.5,
      sugar: 28,
      sodium: 900
    },
    price: 155,
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/gyhnhupu6h6mc6ixmplv",
    ingredients: ["Water", "Tomato Paste", "Sugar", "Salt", "Onion Power", "Garlic Powder"],
    allergens: ["None"],
    servingSize: "15g"
  },
  {
    barcode: "8901058000003",
    name: "Maggi Tomato Ketchup",
    brand: "Maggi",
    category: "Condiments & Sauces",
    nutrition: {
      calories: 100,
      protein: 1,
      carbohydrates: 24,
      fat: 0,
      fiber: 1,
      sugar: 20,
      sodium: 800
    },
    price: 90,
    image: "https://www.quickpantry.in/cdn/shop/files/Maggi_Tomato_Ketchup_Bottle_1_kg_Quick_Pantry.jpg?v=1745148482",
    ingredients: ["Water", "Tomato Paste", "Sugar", "Salt", "Spices"],
    allergens: ["None"],
    servingSize: "15g"
  },
  {
    barcode: "8901058002232",
    name: "Nescafe Classic Coffee",
    brand: "Nescafe",
    category: "Beverages",
    nutrition: {
      calories: 2,
      protein: 0.2,
      carbohydrates: 0.3,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 1
    },
    price: 165,
    image: "https://m.media-amazon.com/images/S/aplus-media/vc/bb6a0196-cad0-4395-b85e-134ef725c0f7._CR0,0,1251,1251_PT0_SX300__.png",
    ingredients: ["Coffee Beans"],
    allergens: ["None"],
    servingSize: "1.5g"
  },
  {
    barcode: "8901103023025",
    name: "Bournvita Health Drink",
    brand: "Cadbury",
    category: "Health Drinks",
    nutrition: {
      calories: 395,
      protein: 7,
      carbohydrates: 85,
      fat: 2,
      fiber: 1,
      sugar: 70,
      sodium: 150
    },
    price: 220,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&auto=format",
    ingredients: ["Malt Extract", "Sugar", "Cocoa Powder", "Milk Solids", "Vitamins"],
    allergens: ["Milk", "Gluten"],
    servingSize: "20g"
  },
  // Cereals
  {
    barcode: "8901058000001",
    name: "Kellogg's Corn Flakes",
    brand: "Kellogg's",
    category: "Breakfast Cereals",
    nutrition: { calories: 100, protein: 2, carbohydrates: 24, fat: 0.1, fiber: 1, sugar: 3, sodium: 200 },
    price: 80,
    image: "https://www.bbassets.com/media/uploads/p/l/251018_9-kelloggs-corn-flakes.jpg",
    ingredients: ["Milled Corn", "Sugar", "Malt Flavoring", "Salt"],
    allergens: ["None"],
    servingSize: "30g"
  },
  {
    barcode: "8901058000002",
    name: "Bagrry's Muesli",
    brand: "Bagrry's",
    category: "Breakfast Cereals",
    nutrition: { calories: 120, protein: 4, carbohydrates: 22, fat: 3, fiber: 4, sugar: 8, sodium: 50 },
    price: 120,
    image: "https://www.bbassets.com/media/uploads/p/l/40170230_5-bagrrys-crunchy-muesli-fruit-nut-with-cranberry.jpg",
    ingredients: ["Rolled Oats", "Honey", "Nuts", "Dried Fruits", "Wheat Flakes"],
    allergens: ["Wheat", "Nuts"],
    servingSize: "40g"
  },
  // Juices
  {
    barcode: "8901207034114",
    name: "Real Orange Juice",
    brand: "Real",
    category: "Soft Drinks & Juices",
    nutrition: { calories: 45, protein: 0.5, carbohydrates: 11, fat: 0, fiber: 0, sugar: 11, sodium: 10 },
    price: 40,
    image: "https://www.bbassets.com/media/uploads/p/l/229910_8-real-fruit-power-juice-orange.jpg",
    ingredients: ["Water", "Orange Juice Concentrate", "Sugar", "Acidity Regulator", "Vitamin C"],
    allergens: ["None"],
    servingSize: "200ml"
  },
  {
    barcode: "8901207034115",
    name: "Real Mixed Fruit Juice",
    brand: "Real",
    category: "Soft Drinks & Juices",
    nutrition: { calories: 48, protein: 0.5, carbohydrates: 12, fat: 0, fiber: 0.5, sugar: 11, sodium: 15 },
    price: 45,
    image: "https://cdn.zeptonow.com/production/tr:w-312,ar-2000-2000,pr-true,f-auto,,q-40/cms/product_variant/239ba2e5-7652-4ab1-8e76-e80316cb01e8.jpeg",
    ingredients: ["Water", "Mixed Fruit Juice Concentrate", "Sugar", "Acidity Regulator", "Vitamin C"],
    allergens: ["None"],
    servingSize: "200ml"
  },
  {
    barcode: "8901103000001",
    name: "Horlicks Health Drink",
    brand: "Horlicks",
    category: "Health Drinks",
    nutrition: {
      calories: 380,
      protein: 14,
      carbohydrates: 75,
      fat: 3,
      fiber: 4,
      sugar: 30,
      sodium: 150
    },
    price: 200,
    image: "https://www.bbassets.com/media/uploads/p/l/119384_16-horlicks-health-nutrition-drink-classic-malt.jpg",
    ingredients: ["Malt Extract", "Wheat Flour", "Milk Solids", "Sugar", "Minerals", "Vitamins"],
    allergens: ["Wheat", "Milk", "Barley"],
    servingSize: "27g"
  }
];

// Function to lookup product by barcode
export const lookupProductByBarcode = (barcode: string): BarcodeProduct | null => {
  // Clean the barcode input (remove spaces, dashes, etc.)
  const cleanBarcode = barcode.replace(/[\s-]/g, '').toUpperCase();

  // First try exact match
  let product = barcodeDatabase.find(p => p.barcode === cleanBarcode);

  // If not found, try partial match (for cases where user enters partial barcode)
  if (!product) {
    product = barcodeDatabase.find(p => p.barcode.includes(cleanBarcode) || cleanBarcode.includes(p.barcode));
  }

  return product || null;
};

// Function to get all products for a category
export const getProductsByCategory = (category: string): BarcodeProduct[] => {
  return barcodeDatabase.filter(p => p.category === category);
};

// Function to search products by name or brand
export const searchProducts = (query: string): BarcodeProduct[] => {
  const cleanQuery = query.toLowerCase();
  return barcodeDatabase.filter(p =>
    p.name.toLowerCase().includes(cleanQuery) ||
    p.brand.toLowerCase().includes(cleanQuery) ||
    p.category.toLowerCase().includes(cleanQuery)
  );
};

export default barcodeDatabase;
