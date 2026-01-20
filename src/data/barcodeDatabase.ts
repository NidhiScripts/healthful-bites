// Mock barcode database with product information
// In a real application, this would connect to a barcode API service like Open Food Facts
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

const barcodeDatabase: BarcodeProduct[] = [
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
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&h=200&fit=crop",
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
    price: 12,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop",
    ingredients: ["Refined Wheat Flour", "Palm Oil", "Salt", "Spices", "Minerals"],
    allergens: ["Wheat"],
    servingSize: "65g"
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
    price: 10,
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&h=600&fit=crop",
    ingredients: ["Wheat Flour", "Sugar", "Edible Vegetable Oil", "Milk Solids", "Leavening Agents"],
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
    image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&h=600&fit=crop",
    ingredients: ["Refined Wheat Flour", "Sugar", "Butter", "Milk Solids", "Salt"],
    allergens: ["Wheat", "Milk", "Butter"],
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
    image: "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=800&h=600&fit=crop",
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
    price: 18,
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f71?w=800&h=600&fit=crop",
    ingredients: ["Rice Flour", "Edible Vegetable Oil", "Salt", "Spices"],
    allergens: ["None"],
    servingSize: "28g"
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
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&h=600&fit=crop",
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
    image: "https://images.unsplash.com/photo-1511381939415-c1c0d0e6c7b5?w=800&h=600&fit=crop",
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
    image: "https://images.unsplash.com/photo-1543253687-c931c8e01820?w=800&h=600&fit=crop",
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
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800&h=600&fit=crop",
    ingredients: ["Carbonated Water", "Sugar", "Caffeine", "Phosphoric Acid", "Natural Flavors"],
    allergens: ["None"],
    servingSize: "330ml"
  },

  // Dairy Products
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
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=200&fit=crop",
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
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop",
    ingredients: ["Milk", "Live Cultures", "Sugar", "Fruit Pulp"],
    allergens: ["Milk"],
    servingSize: "100g"
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
