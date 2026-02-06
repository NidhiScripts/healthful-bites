import React, { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ProductSearch from './components/ProductSearch';
import ProductComparison from './components/ProductComparison';
import DietTracker from './components/DietTracker';
import { lookupProductByBarcode, BarcodeProduct } from './data/barcodeDatabase';
import { LogOut, Scan } from 'lucide-react';
import { Button } from './components/ui/button';
import BarcodeScanner from './components/BarcodeScanner';
import { fetchProductByBarcode } from './services/openFoodFactsService';
import { mapOpenFoodFactsToBarcodeProduct } from './utils/productMapper';
import { toast } from 'sonner';

// Simple Login Component
const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication simulation
    setTimeout(() => {
      if (email && password) {
        onLogin();
      } else {
        alert('Please enter email and password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-indigo-600 mb-2">NutriDSA</h1>
          <p className="text-xl text-slate-600">Your Personal Nutrition & Diet Assistant</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-slate-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-xl py-4 rounded-xl transition-colors"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-800 text-center">
            <strong>Demo:</strong> Enter any email and password to login
          </p>
        </div>
      </div>
    </div>
  );
};

// Complete product data with images for all categories
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const mockProducts = [
    // Instant Noodles
    {
      id: 'maggi-2min',
      name: 'Maggi 2-Minute Noodles',
      brand: 'Maggi',
      category: 'Instant Noodles',
      itemKey: 'noodles-classic',
      nutrition: { calories: 380, protein: 8, carbohydrates: 56, fat: 15, fiber: 2, sugar: 2, sodium: 850 },
      price: 15,
      image: '/assets/foods/maggi-noodles.png'
    },
    {
      id: 'yippee-classic',
      name: 'Yippee Classic Noodles',
      brand: 'Yippee',
      category: 'Instant Noodles',
      itemKey: 'noodles-classic',
      nutrition: { calories: 390, protein: 7, carbohydrates: 58, fat: 16, fiber: 1.5, sugar: 1.8, sodium: 820 },
      price: 12,
      image: 'https://www.bbassets.com/media/uploads/p/l/287006_25-sunfeast-yippee-noodles-magic-masala.jpg'
    },
    {
      id: 'topramen-chicken',
      name: 'Top Ramen Chicken Flavor',
      brand: 'Top Ramen',
      category: 'Instant Noodles',
      itemKey: 'noodles-bowl',
      nutrition: { calories: 380, protein: 8, carbohydrates: 56, fat: 14, fiber: 2, sugar: 2, sodium: 790 },
      price: 20,
      image: 'https://www.bbassets.com/media/uploads/p/l/40001627_9-top-ramen-noodles-masala.jpg'
    },
    {
      id: 'knorr-noodles',
      name: 'Knorr Vegetable Noodles',
      brand: 'Knorr',
      category: 'Instant Noodles',
      itemKey: 'noodles-bowl',
      nutrition: { calories: 350, protein: 7, carbohydrates: 60, fat: 12, fiber: 3, sugar: 3, sodium: 750 },
      price: 25,
      image: 'https://assets.unileversolutions.com/v1/36462809.png'
    },

    // Cakes & Pastries
    {
      id: 'britannia-little-hearts',
      name: 'Britannia Little Hearts',
      brand: 'Britannia',
      category: 'Cakes & Pastries (Packed)',
      itemKey: 'cake-slice-vanilla',
      nutrition: { calories: 420, protein: 4, carbohydrates: 65, fat: 18, fiber: 1, sugar: 28, sodium: 180 },
      price: 25,
      image: 'https://www.jiomart.com/images/product/original/491264336/britannia-little-hearts-classic-biscuits-70-g-product-images-o491264336-p491264336-0-202501122156.jpg?im=Resize=(1000,1000)'
    },
    {
      id: 'monginis-vanilla',
      name: 'Monginis Vanilla Cake Slice',
      brand: 'Monginis',
      category: 'Cakes & Pastries (Packed)',
      itemKey: 'cake-slice-vanilla',
      nutrition: { calories: 280, protein: 3, carbohydrates: 35, fat: 15, fiber: 0.5, sugar: 20, sodium: 120 },
      price: 45,
      image: 'https://m.media-amazon.com/images/I/81ZffmFqsDL._AC_UF894,1000_QL80_.jpg'
    },

    // Biscuits & Cookies
    {
      id: 'parle-g',
      name: 'Parle-G Glucose Biscuits',
      brand: 'Parle',
      category: 'Biscuits & Cookies',
      itemKey: 'biscuits-everyday',
      nutrition: { calories: 380, protein: 6, carbohydrates: 72, fat: 8, fiber: 1.5, sugar: 18, sodium: 150 },
      price: 15,
      image: 'https://www.chai-masala.co.uk/wp-content/uploads/2021/12/paele-G-a-scaled.jpg'
    },
    {
      id: 'goodday-butter',
      name: 'Good Day Butter Biscuits',
      brand: 'Good Day',
      category: 'Biscuits & Cookies',
      itemKey: 'biscuits-everyday',
      nutrition: { calories: 420, protein: 4, carbohydrates: 58, fat: 20, fiber: 1, sugar: 15, sodium: 140 },
      price: 15,
      image: 'https://www.quickpantry.in/cdn/shop/products/britannia-good-day-cashew-cookies-100-g-quick-pantry.jpg?v=1710538215'
    },
    {
      id: 'hide-seek',
      name: 'Hide & Seek Biscuits',
      brand: 'Parle',
      category: 'Biscuits & Cookies',
      itemKey: 'biscuits-everyday',
      nutrition: { calories: 480, protein: 6, carbohydrates: 72, fat: 20, fiber: 2, sugar: 25, sodium: 250 },
      price: 20,
      image: 'http://themintleaves.com/cdn/shop/products/Parle-Hide-seek_7c34205a-0202-4777-83d3-5041c2884dfb_1200x1200.png?v=1619599543'
    },
    {
      id: 'bourbon',
      name: 'Bourbon Biscuits',
      brand: 'Britannia',
      category: 'Biscuits & Cookies',
      itemKey: 'biscuits-everyday',
      nutrition: { calories: 500, protein: 6, carbohydrates: 75, fat: 22, fiber: 1.5, sugar: 30, sodium: 200 },
      price: 30,
      image: 'https://www.bbassets.com/media/uploads/p/l/263593_28-britannia-bourbon-chocolate-cream-biscuits.jpg'
    },
    {
      id: 'oreo',
      name: 'Oreo Biscuits',
      brand: 'Oreo',
      category: 'Biscuits & Cookies',
      itemKey: 'biscuits-everyday',
      nutrition: { calories: 480, protein: 4, carbohydrates: 71, fat: 21, fiber: 1, sugar: 35, sodium: 450 },
      price: 30,
      image: 'https://cdn.shopaccino.com/edible-smart/products/cadbury-oreo-creme-biscuit---vanilla-313899_l.jpg?v=651'
    },

    // Chips & Salty Snacks
    {
      id: 'lays-classic',
      name: 'Lays Classic Potato Chips',
      brand: 'Lays',
      category: 'Chips & Salty Snacks',
      itemKey: 'chips-classic',
      nutrition: { calories: 160, protein: 2, carbohydrates: 15, fat: 10, fiber: 1, sugar: 0.5, sodium: 170 },
      price: 20,
      image: 'https://www.quickpantry.in/cdn/shop/products/lay-s-spanish-tomato-tango-potato-chips-32-g-quick-pantry.jpg?v=1710538823'
    },
    {
      id: 'bingo-mad-angles',
      name: 'Bingo Mad Angles',
      brand: 'Bingo',
      category: 'Chips & Salty Snacks',
      itemKey: 'chips-classic',
      nutrition: { calories: 180, protein: 2.5, carbohydrates: 18, fat: 11, fiber: 1.2, sugar: 1, sodium: 200 },
      price: 18,
      image: 'https://m.media-amazon.com/images/I/81R07cM4UrL.jpg'
    },
    {
      id: 'kurkure',
      name: 'Kurkure Masala Munch',
      brand: 'Kurkure',
      category: 'Chips & Salty Snacks',
      itemKey: 'chips-classic',
      nutrition: { calories: 270, protein: 3, carbohydrates: 30, fat: 15, fiber: 1, sugar: 2, sodium: 600 },
      price: 20,
      image: 'https://m.media-amazon.com/images/I/71LyKlizpuL._AC_UF894,1000_QL80_.jpg'
    },
    {
      id: 'haldiram-bhujia',
      name: 'Haldiram Bhujia',
      brand: 'Haldiram',
      category: 'Chips & Salty Snacks',
      itemKey: 'chips-classic',
      nutrition: { calories: 320, protein: 7, carbohydrates: 40, fat: 18, fiber: 1, sugar: 1, sodium: 750 },
      price: 35,
      image: 'https://www.haldirams.com/media/catalog/product/cache/71134970afb779eb7860339989626b7e/b/l/blu08127_1.jpg'
    },

    // Chocolates
    {
      id: 'dairy-milk',
      name: 'Dairy Milk Chocolate',
      brand: 'Dairy Milk',
      category: 'Chocolates',
      itemKey: 'chocolate-milk',
      nutrition: { calories: 230, protein: 3, carbohydrates: 26, fat: 13, fiber: 1, sugar: 23, sodium: 25 },
      price: 30,
      image: 'https://www.bigbasket.com/media/uploads/p/m/40307753_6-cadbury-dairy-milk-chocolate-bar.jpg'
    },
    {
      id: 'kitkat',
      name: 'KitKat Chocolate',
      brand: 'KitKat',
      category: 'Chocolates',
      itemKey: 'chocolate-milk',
      nutrition: { calories: 210, protein: 2.5, carbohydrates: 24, fat: 11, fiber: 0.8, sugar: 20, sodium: 30 },
      price: 25,
      image: 'https://www.bbassets.com/media/uploads/p/l/40122230_15-nestle-kitkat-crispy-wafer-bar.jpg'
    },

    // Breakfast Cereals
    {
      id: 'kelloggs-corn-flakes',
      name: "Kellogg's Corn Flakes",
      brand: "Kellogg's",
      category: 'Breakfast Cereals',
      itemKey: 'cereal-bowl',
      nutrition: { calories: 100, protein: 2, carbohydrates: 24, fat: 0.1, fiber: 1, sugar: 3, sodium: 200 },
      price: 80,
      image: 'https://www.bbassets.com/media/uploads/p/l/251018_9-kelloggs-corn-flakes.jpg'
    },
    {
      id: 'bagrrys-muesli',
      name: "Bagrry's Muesli",
      brand: "Bagrry's",
      category: 'Breakfast Cereals',
      itemKey: 'cereal-bowl',
      nutrition: { calories: 120, protein: 4, carbohydrates: 22, fat: 3, fiber: 4, sugar: 8, sodium: 50 },
      price: 120,
      image: 'https://www.bbassets.com/media/uploads/p/l/40170230_5-bagrrys-crunchy-muesli-fruit-nut-with-cranberry.jpg'
    },

    // Soft Drinks & Juices
    {
      id: 'coca-cola',
      name: 'Coca-Cola',
      brand: 'Coca-Cola',
      category: 'Soft Drinks & Juices',
      itemKey: 'cola',
      nutrition: { calories: 140, protein: 0, carbohydrates: 39, fat: 0, fiber: 0, sugar: 39, sodium: 15 },
      price: 25,
      image: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?w=800&h=600&fit=crop'
    },
    {
      id: 'pepsi',
      name: 'Pepsi',
      brand: 'Pepsi',
      category: 'Soft Drinks & Juices',
      itemKey: 'cola',
      nutrition: { calories: 150, protein: 0, carbohydrates: 41, fat: 0, fiber: 0, sugar: 41, sodium: 15 },
      price: 25,
      image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800&h=600&fit=crop'
    },
    {
      id: 'tropicana',
      name: 'Tropicana Orange Juice',
      brand: 'Tropicana',
      category: 'Soft Drinks & Juices',
      itemKey: 'juice',
      nutrition: { calories: 90, protein: 1, carbohydrates: 22, fat: 0, fiber: 0.5, sugar: 20, sodium: 10 },
      price: 40,
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&h=600&fit=crop'
    },
    {
      id: 'real-juice',
      name: 'Real Mixed Fruit Juice',
      brand: 'Real',
      category: 'Soft Drinks & Juices',
      itemKey: 'juice',
      nutrition: { calories: 100, protein: 0.5, carbohydrates: 25, fat: 0, fiber: 0.5, sugar: 23, sodium: 15 },
      price: 45,
      image: 'https://cdn.zeptonow.com/production/tr:w-312,ar-2000-2000,pr-true,f-auto,,q-40/cms/product_variant/239ba2e5-7652-4ab1-8e76-e80316cb01e8.jpeg'
    },
    {
      id: 'real-orange-juice',
      name: 'Real Orange Juice',
      brand: 'Real',
      category: 'Soft Drinks & Juices',
      itemKey: 'juice',
      nutrition: { calories: 45, protein: 0.5, carbohydrates: 11, fat: 0, fiber: 0, sugar: 11, sodium: 10 },
      price: 40,
      image: 'https://www.bbassets.com/media/uploads/p/l/229910_8-real-fruit-power-juice-orange.jpg'
    },
    {
      id: 'red-bull',
      name: 'Red Bull Energy Drink',
      brand: 'Red Bull',
      category: 'Soft Drinks & Juices',
      itemKey: 'energy-drink',
      nutrition: { calories: 110, protein: 1, carbohydrates: 28, fat: 0, fiber: 0, sugar: 27, sodium: 40 },
      price: 110,
      image: 'https://images-eu.ssl-images-amazon.com/images/I/51Bp30CR3IL._AC_UL210_SR210,210_.jpg'
    },
    {
      id: 'yakult',
      name: 'Yakult Probiotic Drink',
      brand: 'Yakult',
      category: 'Soft Drinks & Juices',
      itemKey: 'probiotic',
      nutrition: { calories: 50, protein: 1.5, carbohydrates: 11, fat: 0, fiber: 0, sugar: 10, sodium: 15 },
      price: 80,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Yakult_drink.jpg/250px-Yakult_drink.jpg'
    },

    // Dairy Products
    {
      id: 'amul-milk',
      name: 'Amul Toned Milk',
      brand: 'Amul',
      category: 'Dairy Products (Packed)',
      itemKey: 'dairy-basic',
      nutrition: { calories: 47, protein: 3.2, carbohydrates: 4.8, fat: 1.5, fiber: 0, sugar: 4.8, sodium: 50 },
      price: 6,
      image: 'https://www.vrindasupermart.in/wp-content/uploads/2021/08/306926-2_4-amul-homogenised-toned-milk-e1628691620898.jpg'
    },
    {
      id: 'mother-dairy-yogurt',
      name: 'Mother Dairy Yogurt',
      brand: 'Mother Dairy',
      category: 'Dairy Products (Packed)',
      itemKey: 'dairy-basic',
      nutrition: { calories: 80, protein: 3.5, carbohydrates: 12, fat: 2.5, fiber: 0.5, sugar: 11, sodium: 40 },
      price: 25,
      image: 'https://m.media-amazon.com/images/I/51NlT7TEhCL._AC_UF894,1000_QL80_.jpg'
    },
    // Condiments & Sauces
    {
      id: 'kissan-ketchup',
      name: 'Kissan Tomato Ketchup',
      brand: 'Kissan',
      category: 'Condiments & Sauces',
      itemKey: 'sauce-basic',
      nutrition: { calories: 121, protein: 1, carbohydrates: 29, fat: 0, fiber: 0.5, sugar: 28, sodium: 900 },
      price: 155,
      image: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/gyhnhupu6h6mc6ixmplv'
    },
    // Condiments & Sauces
    {
      id: 'maggi-ketchup',
      name: 'Maggi Tomato Ketchup',
      brand: 'Maggi',
      category: 'Condiments & Sauces',
      itemKey: 'sauce-ketchup',
      nutrition: { calories: 100, protein: 1, carbohydrates: 24, fat: 0, fiber: 1, sugar: 20, sodium: 800 },
      price: 90,
      image: 'https://www.quickpantry.in/cdn/shop/files/Maggi_Tomato_Ketchup_Bottle_1_kg_Quick_Pantry.jpg?v=1745148482'
    },
    // Beverages
    {
      id: 'nescafe-coffee',
      name: 'Nescafe Classic Coffee',
      brand: 'Nescafe',
      category: 'Beverages',
      itemKey: 'beverage-coffee',
      nutrition: { calories: 2, protein: 0.2, carbohydrates: 0.3, fat: 0, fiber: 0, sugar: 0, sodium: 1 },
      price: 150,
      image: 'https://m.media-amazon.com/images/S/aplus-media/vc/bb6a0196-cad0-4395-b85e-134ef725c0f7._CR0,0,1251,1251_PT0_SX300__.png'
    },
    // Health Drinks
    {
      id: 'horlicks',
      name: 'Horlicks Health Drink',
      brand: 'Horlicks',
      category: 'Health Drinks',
      itemKey: 'health-drink',
      nutrition: { calories: 380, protein: 14, carbohydrates: 75, fat: 3, fiber: 4, sugar: 30, sodium: 150 },
      price: 200,
      image: 'https://www.bbassets.com/media/uploads/p/l/119384_16-horlicks-health-nutrition-drink-classic-malt.jpg'
    },
    {
      id: 'amul-butter',
      name: 'Amul Butter',
      brand: 'Amul',
      category: 'Dairy Products (Packed)',
      itemKey: 'dairy-basic',
      nutrition: { calories: 100, protein: 0, carbohydrates: 0, fat: 11, fiber: 0, sugar: 0, sodium: 800 },
      price: 55,
      image: 'https://m.media-amazon.com/images/I/717GgfVk6YL._AC_UF894,1000_QL80_.jpg'
    },

    // Ready-to-Eat Foods
    {
      id: 'mtr-upma',
      name: 'MTR Ready to Eat Upma',
      brand: 'MTR',
      category: 'Ready-to-Eat Foods',
      itemKey: 'ready-meal',
      nutrition: { calories: 180, protein: 4, carbohydrates: 28, fat: 6, fiber: 2, sugar: 2, sodium: 320 },
      price: 40,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop'
    },
    {
      id: 'haldirams-samosa',
      name: 'Haldiram Frozen Samosa',
      brand: "Haldiram's",
      category: 'Ready-to-Eat Foods',
      itemKey: 'ready-meal',
      nutrition: { calories: 160, protein: 3, carbohydrates: 18, fat: 8, fiber: 2.5, sugar: 1.5, sodium: 280 },
      price: 35,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop'
    },

    // Ice Creams
    {
      id: 'kwality-walls-vanilla',
      name: 'Kwality Walls Vanilla Ice Cream',
      brand: 'Kwality Walls',
      category: 'Ice Creams (Packed)',
      itemKey: 'ice-cream',
      nutrition: { calories: 137, protein: 2, carbohydrates: 16, fat: 7, fiber: 0.5, sugar: 14, sodium: 40 },
      price: 45,
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop'
    },
    {
      id: 'vadilal-mango',
      name: 'Vadilal Mango Ice Cream',
      brand: 'Vadilal',
      category: 'Ice Creams (Packed)',
      itemKey: 'ice-cream',
      nutrition: { calories: 145, protein: 2.2, carbohydrates: 18, fat: 7.5, fiber: 0.3, sugar: 16, sodium: 35 },
      price: 40,
      image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=300&h=200&fit=crop'
    }
  ];

  const cacheBust = useMemo(() => Date.now(), []);

  const categories = useMemo(() => {
    return Array.from(new Set(mockProducts.map(p => p.category)));
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedItemKey, setSelectedItemKey] = useState(mockProducts[0].itemKey);

  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [isItemFocused, setIsItemFocused] = useState(false);

  const [searchedProduct, setSearchedProduct] = useState<BarcodeProduct | null>(null);

  const [activeTab, setActiveTab] =
    useState<'browse' | 'compare' | 'diet'>('browse');
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Product comparison state
  const [comparisonProducts, setComparisonProducts] = useState<BarcodeProduct[]>([]);

  // Diet tracker state
  const [dietItems, setDietItems] = useState<any[]>([]);

  /* ---------------- DERIVED DATA ---------------- */

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(
      p => p.category === selectedCategory
    );
  }, [selectedCategory]);

  const chartData = useMemo(() => {
    return filteredProducts.map(p => ({
      brand: p.brand,
      calories: p.nutrition.calories,
      protein: p.nutrition.protein,
      sugar: p.nutrition.sugar,
      sodium: p.nutrition.sodium,
    }));
  }, [filteredProducts]);

  /* ---------------- HANDLERS ---------------- */


  // Product comparison handlers
  const handleRemoveProduct = (productId: string) => {
    setComparisonProducts(prev => prev.filter(p => p.barcode !== productId));
  };

  const handleClearComparison = () => {
    setComparisonProducts([]);
  };

  // Diet tracker handlers
  const handleAddDietItem = (product: BarcodeProduct) => {
    setDietItems(prev => [...prev, { ...product, quantity: 1, addedAt: new Date() }]);
  };

  const handleRemoveDietItem = (barcode: string) => {
    setDietItems(prev => prev.filter(item => item.barcode !== barcode));
  };

  const handleUpdateQuantity = (barcode: string, quantity: number) => {
    setDietItems(prev => prev.map(item =>
      item.barcode === barcode ? { ...item, quantity } : item
    ));
  };

  const handleClearDiet = () => {
    setDietItems([]);
  };

  const handleBarcodeDetected = async (barcode: string) => {
    setIsScannerOpen(false);

    // First check local database
    const localProduct = lookupProductByBarcode(barcode);
    if (localProduct) {
      setSearchedProduct(localProduct);
      toast.success(`Found: ${localProduct.name}`);
      return;
    }

    // If not in local, check Open Food Facts
    toast.loading('Searching Open Food Facts...', { id: 'scanning' });
    const apiProduct = await fetchProductByBarcode(barcode);

    if (apiProduct) {
      const mappedProduct = mapOpenFoodFactsToBarcodeProduct(apiProduct);
      setSearchedProduct(mappedProduct);
      toast.success(`Found on Open Food Facts: ${mappedProduct.name}`, { id: 'scanning' });
    } else {
      toast.error('Product not found in any database', { id: 'scanning' });
    }
  };

  const fallbackImage =
    'https://images.unsplash.com/photo-1546069901-b9f581a1996d?w=800';

  /* ---------------- JSX ---------------- */

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="w-full max-w-7xl mx-auto px-6 py-10 relative">
        {/* ---------------- HEADER ---------------- */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-8xl font-bold text-indigo-600 mb-2">NutriDSA</h1>
            <p className="text-2xl text-slate-600">Your Personal Nutrition & Diet Assistant</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-4 bg-white rounded-2xl border-2 border-slate-100 shadow-sm text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all group"
            title="Logout"
          >
            <LogOut className="w-8 h-8" />
            <span className="font-bold text-xl uppercase">Logout</span>
          </button>
        </div>

        {/* ---------------- TAB NAVIGATION ---------------- */}
        <div className="mb-8 rounded-3xl bg-slate-100/50 p-2 shadow-inner">
          <div className="flex gap-2">
            {['browse', 'compare', 'diet'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 rounded-2xl py-4 font-bold text-xl tracking-wide transition-all ${activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-lg scale-[1.02]'
                  : 'text-slate-500 hover:bg-white hover:text-slate-700'
                  }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          {/* ---------------- BROWSE ---------------- */}
          {activeTab === 'browse' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-1">
                    <ProductSearch onProductSelect={setSearchedProduct} />
                  </div>
                  <Button
                    onClick={() => setIsScannerOpen(true)}
                    className="h-[72px] px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white gap-3 text-xl font-bold shadow-lg shadow-indigo-200"
                  >
                    <Scan className="w-6 h-6" />
                    Scan Barcode
                  </Button>
                </div>

                <div className="mt-8 max-w-sm">
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Category Filter</label>
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="w-full rounded-2xl border-2 border-slate-100 p-4 text-lg font-medium focus:border-indigo-500 transition-colors outline-none appearance-none bg-white"
                  >
                    {categories.map(cat => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image || fallbackImage}
                        onError={e => (e.currentTarget.src = fallbackImage)}
                        className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl font-black text-slate-900 shadow-sm text-xl rotate-3">
                        ₹{product.price}
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="mb-4">
                        <h3 className="text-3xl font-black text-slate-900 leading-tight mb-1">{product.name}</h3>
                        <p className="text-xl font-bold text-slate-400 uppercase tracking-widest text-sm">{product.brand}</p>
                      </div>

                      {/* Nutrition Information */}
                      <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-slate-50">
                        <div className="space-y-1">
                          <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block">Calories</span>
                          <span className="text-2xl font-black text-slate-900">{product.nutrition.calories}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block">Protein</span>
                          <span className="text-2xl font-black text-slate-900">{product.nutrition.protein}g</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block">Carbs</span>
                          <span className="text-2xl font-black text-slate-900">{product.nutrition.carbohydrates}g</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block">Fat</span>
                          <span className="text-2xl font-black text-slate-900">{product.nutrition.fat}g</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            const barcodeProduct = {
                              ...product,
                              barcode: product.id,
                              category: product.category,
                              itemKey: product.itemKey
                            } as BarcodeProduct;
                            setComparisonProducts(prev => [...prev, barcodeProduct]);
                          }}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-lg font-black transition-all shadow-lg hover:shadow-indigo-200 active:scale-95"
                        >
                          COMPARE
                        </button>
                        <button
                          onClick={() => {
                            const barcodeProduct = {
                              ...product,
                              barcode: product.id,
                              category: product.category,
                              itemKey: product.itemKey
                            } as BarcodeProduct;
                            handleAddDietItem(barcodeProduct);
                          }}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl text-lg font-black transition-all shadow-lg hover:shadow-green-100 active:scale-95"
                        >
                          + DIET
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Analytics</h2>
                    <p className="text-lg font-bold text-slate-400">Nutritional comparison across current view</p>
                  </div>
                </div>
                <div className="h-[400px]">
                  <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="brand" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                      <Tooltip
                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: '#f8fafc' }}
                      />
                      <Legend iconType="circle" />
                      <Bar dataKey="calories" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40} />
                      <Bar dataKey="protein" fill="#22c55e" radius={[8, 8, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- COMPARE ---------------- */}
          {activeTab === 'compare' && (
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 min-h-[600px]">
              <ProductComparison
                products={comparisonProducts}
                onRemoveProduct={handleRemoveProduct}
                onClearAll={handleClearComparison}
              />
            </div>
          )}

          {/* ---------------- DIET ---------------- */}
          {activeTab === 'diet' && (
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 min-h-[600px]">
              <DietTracker
                items={dietItems}
                onAddItem={handleAddDietItem}
                onRemoveItem={handleRemoveDietItem}
                onUpdateQuantity={handleUpdateQuantity}
                onClearAll={handleClearDiet}
              />
            </div>
          )}
        </div>

        {searchedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-6 overflow-hidden">
            <div className="bg-white rounded-[3rem] shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto scale-up-center border border-white/20">
              <div className="relative h-64 w-full bg-slate-100">
                <img
                  src={searchedProduct.image || fallbackImage}
                  className="w-full h-full object-cover"
                  onError={e => e.currentTarget.src = fallbackImage}
                />
                <button
                  onClick={() => setSearchedProduct(null)}
                  className="absolute top-6 right-6 bg-white/80 backdrop-blur p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-5xl font-black text-slate-900 leading-tight mb-2">{searchedProduct.name}</h2>
                    <p className="text-2xl font-bold text-slate-400 uppercase tracking-widest">{searchedProduct.brand}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-emerald-600 mb-1">
                      {searchedProduct.price > 0 ? `₹${searchedProduct.price}` : 'FREE DATA'}
                    </div>
                    {searchedProduct.barcode && searchedProduct.barcode.length > 10 && (
                      <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-xl font-bold text-sm uppercase">OpenFoodFacts API</span>
                    )}
                  </div>
                </div>

                {/* Detailed Nutrition Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <span className="text-slate-400 font-bold text-sm uppercase block mb-1">Calories</span>
                    <span className="text-3xl font-black text-slate-900">{searchedProduct.nutrition.calories}</span>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <span className="text-slate-400 font-bold text-sm uppercase block mb-1">Protein</span>
                    <span className="text-3xl font-black text-slate-900">{searchedProduct.nutrition.protein}g</span>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <span className="text-slate-400 font-bold text-sm uppercase block mb-1">Carbs</span>
                    <span className="text-3xl font-black text-slate-900">{searchedProduct.nutrition.carbohydrates}g</span>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <span className="text-slate-400 font-bold text-sm uppercase block mb-1">Fat</span>
                    <span className="text-3xl font-black text-slate-900">{searchedProduct.nutrition.fat}g</span>
                  </div>
                </div>

                <div className="space-y-8 mb-12 text-xl text-slate-600 leading-relaxed">
                  {searchedProduct.ingredients && searchedProduct.ingredients.length > 0 && (
                    <div>
                      <h4 className="font-black text-slate-900 mb-3 uppercase tracking-wider text-base">Ingredients</h4>
                      <p className="bg-slate-50 p-6 rounded-3xl border border-slate-100">{searchedProduct.ingredients.join(', ')}</p>
                    </div>
                  )}
                  {searchedProduct.allergens && searchedProduct.allergens.length > 0 && (
                    <div>
                      <h4 className="font-black text-rose-600 mb-3 uppercase tracking-wider text-base">Allergy Warnings</h4>
                      <div className="flex flex-wrap gap-3">
                        {searchedProduct.allergens.map((allergen: string) => (
                          <span key={allergen} className="bg-rose-50 text-rose-600 px-6 py-2 rounded-2xl font-bold uppercase text-sm border border-rose-100">
                            {allergen}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setComparisonProducts(prev => [...prev, searchedProduct]);
                      setSearchedProduct(null);
                    }}
                    className="flex-1 bg-indigo-600 text-white py-6 rounded-3xl font-black text-2xl shadow-xl hover:shadow-indigo-200 active:scale-95 transition-all"
                  >
                    ADD TO COMPARE
                  </button>
                  <button
                    onClick={() => {
                      handleAddDietItem(searchedProduct);
                      setSearchedProduct(null);
                    }}
                    className="flex-1 bg-green-500 text-white py-6 rounded-3xl font-black text-2xl shadow-xl hover:shadow-green-100 active:scale-95 transition-all"
                  >
                    ADD TO DIET
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- BARCODE SCANNER MODAL ---------------- */}
        {isScannerOpen && (
          <BarcodeScanner
            onDetected={handleBarcodeDetected}
            onClose={() => setIsScannerOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
