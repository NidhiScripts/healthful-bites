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
import BarcodeScanner from './components/BarcodeScanner';
import BarcodeResult from './components/BarcodeResult';
import ProductSearch from './components/ProductSearch';
import ProductComparison from './components/ProductComparison';
import DietTracker from './components/DietTracker';
import { lookupProductByBarcode, BarcodeProduct } from './data/barcodeDatabase';

// Complete product data with images for all categories
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
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&h=200&fit=crop'
  },
  {
    id: 'yippee-classic',
    name: 'Yippee Classic Noodles',
    brand: 'Yippee',
    category: 'Instant Noodles',
    itemKey: 'noodles-classic',
    nutrition: { calories: 390, protein: 7, carbohydrates: 58, fat: 16, fiber: 1.5, sugar: 1.8, sodium: 820 },
    price: 12,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop'
  },
  {
    id: 'topramen-chicken',
    name: 'Top Ramen Chicken Flavor',
    brand: 'Top Ramen',
    category: 'Instant Noodles',
    itemKey: 'noodles-classic',
    nutrition: { calories: 370, protein: 9, carbohydrates: 54, fat: 14, fiber: 2.2, sugar: 2.5, sodium: 780 },
    price: 18,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=200&fit=crop'
  },
  {
    id: 'knorr-veg',
    name: 'Knorr Vegetable Noodles',
    brand: 'Knorr',
    category: 'Instant Noodles',
    itemKey: 'noodles-classic',
    nutrition: { calories: 360, protein: 8.5, carbohydrates: 52, fat: 13, fiber: 3, sugar: 3, sodium: 750 },
    price: 20,
    image: 'https://images.unsplash.com/photo-1559315209-59d437e9d5a4?w=300&h=200&fit=crop'
  },

  // Biscuits & Cookies
  {
    id: 'parle-g',
    name: 'Parle-G Glucose Biscuits',
    brand: 'Parle',
    category: 'Biscuits & Cookies',
    itemKey: 'biscuits-everyday',
    nutrition: { calories: 380, protein: 6, carbohydrates: 72, fat: 8, fiber: 1.5, sugar: 18, sodium: 150 },
    price: 10,
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&h=600&fit=crop'
  },
  {
    id: 'goodday-butter',
    name: 'Good Day Butter Biscuits',
    brand: 'Good Day',
    category: 'Biscuits & Cookies',
    itemKey: 'biscuits-everyday',
    nutrition: { calories: 420, protein: 4, carbohydrates: 58, fat: 20, fiber: 1, sugar: 15, sodium: 140 },
    price: 15,
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&h=600&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=800&h=600&fit=crop'
  },
  {
    id: 'bingo-mad-angles',
    name: 'Bingo Mad Angles',
    brand: 'Bingo',
    category: 'Chips & Salty Snacks',
    itemKey: 'chips-classic',
    nutrition: { calories: 180, protein: 2.5, carbohydrates: 18, fat: 11, fiber: 1.2, sugar: 1, sodium: 200 },
    price: 18,
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f71?w=800&h=600&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&h=600&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&h=600&fit=crop'
  },
  {
    id: 'bagrrys-muesli',
    name: "Bagrry's Muesli",
    brand: "Bagrry's",
    category: 'Breakfast Cereals',
    itemKey: 'cereal-bowl',
    nutrition: { calories: 120, protein: 4, carbohydrates: 22, fat: 3, fiber: 4, sugar: 8, sodium: 50 },
    price: 120,
    image: 'https://images.unsplash.com/photo-1543353071-087092ec393a?w=800&h=600&fit=crop'
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

  // Dairy Products
  {
    id: 'amul-milk',
    name: 'Amul Toned Milk',
    brand: 'Amul',
    category: 'Dairy Products (Packed)',
    itemKey: 'dairy-basic',
    nutrition: { calories: 47, protein: 3.2, carbohydrates: 4.8, fat: 1.5, fiber: 0, sugar: 4.8, sodium: 50 },
    price: 6,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=200&fit=crop'
  },
  {
    id: 'mother-dairy-yogurt',
    name: 'Mother Dairy Yogurt',
    brand: 'Mother Dairy',
    category: 'Dairy Products (Packed)',
    itemKey: 'dairy-basic',
    nutrition: { calories: 80, protein: 3.5, carbohydrates: 12, fat: 2.5, fiber: 0.5, sugar: 11, sodium: 40 },
    price: 25,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979b1b?w=300&h=200&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop'
  },
  {
    id: 'monginis-vanilla',
    name: 'Monginis Vanilla Cake Slice',
    brand: 'Monginis',
    category: 'Cakes & Pastries (Packed)',
    itemKey: 'cake-slice-vanilla',
    nutrition: { calories: 280, protein: 3, carbohydrates: 35, fat: 15, fiber: 0.5, sugar: 20, sodium: 120 },
    price: 45,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop'
  },
  {
    id: 'kitkat',
    name: 'KitKat Chocolate',
    brand: 'KitKat',
    category: 'Chocolates',
    itemKey: 'chocolate-milk',
    nutrition: { calories: 210, protein: 2.5, carbohydrates: 24, fat: 11, fiber: 0.8, sugar: 20, sodium: 30 },
    price: 25,
    image: 'https://images.unsplash.com/photo-1511381939415-c1c5c1f3d5b5?w=800&h=600&fit=crop'
  }
];

const fallbackImage = 'https://images.unsplash.com/photo-1546069901-b9f581a1996d?w=300&h=200&fit=crop';

const itemLabels: Record<string, string> = {
  'noodles-classic': 'Instant Noodles (Classic)',
  'biscuits-everyday': 'Biscuits (Everyday)',
  'chips-classic': 'Potato Chips (Classic Salted)',
  'chocolate-milk': 'Milk Chocolate Bar',
  'cereal-bowl': 'Breakfast Cereal',
  'cola': 'Cola Soft Drink',
  'dairy-basic': 'Dairy (Milk/Yogurt)',
  'ready-meal': 'Ready-to-Eat Meal',
  'ice-cream': 'Ice Cream (Packed)',
  'cake-slice-vanilla': 'Cake Slice (Vanilla)',
};

const withCacheBust = (url: string, cacheBust: number) => {
  if (!url) return url;
  const joiner = url.includes('?') ? '&' : '?';
  return `${url}${joiner}v=${cacheBust}`;
};

function App() {
  const cacheBust = useMemo(() => Date.now(), []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    mockProducts.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(categories[0] ?? '');
  const [selectedItemKey, setSelectedItemKey] = useState<string>(() => {
    const first = mockProducts.find((p) => p.category === (categories[0] ?? ''));
    return first?.itemKey ?? '';
  });

  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [isItemFocused, setIsItemFocused] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<BarcodeProduct | null>(null);
  const [searchedProduct, setSearchedProduct] = useState<BarcodeProduct | null>(null);
  const [comparisonProducts, setComparisonProducts] = useState<BarcodeProduct[]>([]);
  const [dietItems, setDietItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'browse' | 'compare' | 'diet'>('browse');

  const itemOptions = useMemo(() => {
    const set = new Set<string>();
    mockProducts
      .filter((p) => p.category === selectedCategory)
      .forEach((p) => set.add(p.itemKey));
    return Array.from(set);
  }, [selectedCategory]);

  const filteredProducts = useMemo(
    () =>
      mockProducts.filter(
        (p) => p.category === selectedCategory && p.itemKey === selectedItemKey
      ),
    [selectedCategory, selectedItemKey]
  );

  const itemsForCategory = useMemo(() => {
    return itemOptions.map((key) => {
      const representative = mockProducts.find(
        (p) => p.category === selectedCategory && p.itemKey === key
      );
      return {
        key,
        label: itemLabels[key] ?? key.split('-').join(' '),
        image: representative?.image ?? fallbackImage,
      };
    });
  }, [itemOptions, selectedCategory]);

  const selectedHeroImage = useMemo(() => {
    return (
      mockProducts.find((p) => p.category === selectedCategory && p.itemKey === selectedItemKey)?.image ??
      itemsForCategory.find((i) => i.key === selectedItemKey)?.image ??
      fallbackImage
    );
  }, [itemsForCategory, selectedCategory, selectedItemKey]);

  const chartData = useMemo(() => {
    return filteredProducts.map((p) => ({
      brand: p.brand,
      calories: p.nutrition.calories,
      protein: p.nutrition.protein,
      sugar: p.nutrition.sugar,
      sodium: p.nutrition.sodium,
      fat: p.nutrition.fat,
      carbs: p.nutrition.carbohydrates,
    }));
  }, [filteredProducts]);

  const handleBarcodeScan = (barcode: string) => {
    console.log('handleBarcodeScan called with:', barcode);
    const product = lookupProductByBarcode(barcode);
    console.log('Product found:', product);
    if (product) {
      setScannedProduct(product);
      setShowScanner(false);
    } else {
      alert(`Product not found for barcode: ${barcode}. Try another barcode or use manual entry.`);
    }
  };

  const handleScanComplete = () => {
    setShowScanner(false);
  };

  const handleScanAnother = () => {
    setScannedProduct(null);
    setShowScanner(true);
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
  };

  const handleCloseResult = () => {
    setScannedProduct(null);
  };

  const handleProductSearch = (product: BarcodeProduct) => {
    setSearchedProduct(product);
  };

  const handleCloseSearchResult = () => {
    setSearchedProduct(null);
  };

  const handleAddToComparison = (product: BarcodeProduct) => {
    const exists = comparisonProducts.some(p => p.barcode === product.barcode);
    if (!exists) {
      setComparisonProducts(prev => [...prev, product]);
    }
  };

  const handleRemoveFromComparison = (barcode: string) => {
    setComparisonProducts(prev => prev.filter(p => p.barcode !== barcode));
  };

  const handleClearComparison = () => {
    setComparisonProducts([]);
  };

  const handleAddToDiet = (product: BarcodeProduct) => {
    const existing = dietItems.find(item => item.barcode === product.barcode);
    if (existing) {
      setDietItems(prev => prev.map(item => 
        item.barcode === product.barcode 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setDietItems(prev => [...prev, { ...product, quantity: 1, addedAt: new Date() }]);
    }
  };

  const handleRemoveFromDiet = (barcode: string) => {
    setDietItems(prev => prev.filter(item => item.barcode !== barcode));
  };

  const handleUpdateDietQuantity = (barcode: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromDiet(barcode);
    } else {
      setDietItems(prev => prev.map(item => 
        item.barcode === barcode ? { ...item, quantity } : item
      ));
    }
  };

  const handleClearDiet = () => {
    setDietItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-3 py-4 text-[22px] sm:px-4 sm:text-[24px] lg:px-6 lg:text-[26px] xl:px-8 xl:text-[28px]">
      <div className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-8 py-14 text-white shadow-2xl">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-6xl font-black tracking-tight sm:text-7xl lg:text-8xl xl:text-9xl">NUTRIDSA</h1>
          <p className="mt-4 text-xl text-white/90 sm:text-2xl lg:text-3xl">Compare the same item across brands</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-2 shadow-xl">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex-1 rounded-2xl px-6 py-3 font-bold transition-all ${
              activeTab === 'browse' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🛍️ Browse Products
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`flex-1 rounded-2xl px-6 py-3 font-bold transition-all ${
              activeTab === 'compare' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ⚖️ Compare Products
          </button>
          <button
            onClick={() => setActiveTab('diet')}
            className={`flex-1 rounded-2xl px-6 py-3 font-bold transition-all ${
              activeTab === 'diet' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🥗 Diet Tracker
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'browse' && (
        <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
          {/* Search Section */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl mb-4">Search Products</h3>
            <ProductSearch 
              onProductSelect={handleProductSearch}
              onAddToComparison={handleAddToComparison}
              placeholder="Search for products by name, brand, or category..."
            />
          </div>

          {/* Product Comparison */}
          {comparisonProducts.length > 0 && (
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl mb-4">Product Comparison</h3>
              <ProductComparison
                products={comparisonProducts}
                onRemoveProduct={handleRemoveFromComparison}
                onClearAll={handleClearComparison}
              />
            </div>
          )}

          {/* Divider */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
            <span className="text-lg font-semibold text-slate-500 px-4">OR</span>
            <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          </div>

          {/* Browse Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">Browse by Category</h3>
              <button
                onClick={() => setShowScanner(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Scan Barcode
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-3 block text-lg font-semibold text-slate-600 sm:text-xl lg:text-2xl">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    const nextCategory = e.target.value;
                    setSelectedCategory(nextCategory);
                    const firstKey = mockProducts.find((p) => p.category === nextCategory)?.itemKey ?? '';
                    setSelectedItemKey(firstKey);
                    setIsItemFocused(false);
                  }}
                  className="h-16 w-full rounded-2xl border-2 border-slate-200 bg-white px-6 text-xl text-slate-900 shadow-lg outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 sm:text-2xl"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-3 block text-lg font-semibold text-slate-600 sm:text-xl lg:text-2xl">View</label>
                <div className="flex h-16 w-full overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50 p-2">
                  <button
                    type="button"
                    onClick={() => setViewMode('cards')}
                    className={
                      viewMode === 'cards'
                        ? 'flex-1 rounded-xl bg-white text-lg font-semibold text-slate-900 shadow-md sm:text-xl'
                        : 'flex-1 rounded-xl text-lg font-semibold text-slate-600 sm:text-xl'
                    }
                  >
                    Cards
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={
                      viewMode === 'table'
                        ? 'flex-1 rounded-xl bg-white text-lg font-semibold text-slate-900 shadow-md sm:text-xl'
                        : 'flex-1 rounded-xl text-lg font-semibold text-slate-600 sm:text-xl'
                    }
                  >
                    Table
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-4 text-base font-bold uppercase tracking-wider text-slate-500 sm:text-lg lg:text-xl">Tap an item to view details</div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {itemsForCategory.map((item) => {
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => {
                        setSelectedItemKey(item.key);
                        setIsItemFocused(true);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group overflow-hidden rounded-3xl border-2 border-slate-200 bg-white text-left shadow-lg hover:border-violet-300 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="relative">
                        <img
                          src={withCacheBust(item.image || fallbackImage, cacheBust)}
                          alt={item.label}
                          className="h-44 w-full object-cover sm:h-48 lg:h-52"
                          onError={(e) => {
                            e.currentTarget.src = fallbackImage;
                          }}
                        />
                        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-slate-900 shadow-lg">
                          {selectedCategory}
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">{item.label}</div>
                        <div className="mt-2 text-lg text-slate-500 sm:text-xl lg:text-2xl">Open details</div>
                      </div>
                    </button>
        </div>

        {/* Browse Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">Browse by Category</h3>
            <button
              onClick={() => setShowScanner(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Scan Barcode
            </button>
            <img
              src={withCacheBust(selectedHeroImage, cacheBust)}
              alt={itemLabels[selectedItemKey] ?? selectedItemKey.split('-').join(' ')}
              className="h-80 w-full object-cover sm:h-96 lg:h-[28rem]"
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute left-6 top-6">
              <button
                type="button"
                onClick={() => setIsItemFocused(false)}
                className="rounded-full bg-white/95 px-8 py-4 text-xl font-bold text-slate-900 shadow-xl hover:bg-white transition-all duration-300 transform hover:scale-105"
              >
                Back to items
              </button>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-sm font-bold uppercase tracking-wider text-white/80 sm:text-base lg:text-lg">{selectedCategory}</div>
              <h2 className="mt-2 text-4xl font-black text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                {itemLabels[selectedItemKey] ?? selectedItemKey.split('-').join(' ')}
              </h2>
              <p className="mt-3 text-xl text-white/90 sm:text-2xl lg:text-3xl">Brand comparison for this item</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border-2 border-slate-200 p-6 shadow-lg">
                <div className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Calories / Protein</div>
                <div className="h-80 sm:h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="brand" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="calories" fill="#6366f1" name="Calories" />
                      <Bar dataKey="protein" fill="#22c55e" name="Protein (g)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-3xl border-2 border-slate-200 p-6 shadow-lg">
                <div className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Sugar / Sodium</div>
                <div className="h-80 sm:h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="brand" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sugar" fill="#f97316" name="Sugar (g)" />
                      <Bar dataKey="sodium" fill="#ef4444" name="Sodium (mg)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <div className="relative">
                        <img
                          src={withCacheBust(product.image || fallbackImage, cacheBust)}
                          alt={product.name}
                          className="h-52 w-full object-cover sm:h-56 lg:h-60"
                          onError={(e) => {
                            e.currentTarget.src = fallbackImage;
                          }}
                        />
                        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-slate-900 shadow-lg">
                          {product.brand}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">{product.name}</div>

                        <div className="mt-4 flex items-center gap-3">
                          <span className="rounded-full bg-emerald-600 px-5 py-2 text-base font-bold text-white sm:text-lg lg:text-xl">₹{product.price}</span>
                          <span className="rounded-full bg-slate-900 px-5 py-2 text-base font-bold text-white sm:text-lg lg:text-xl">{selectedCategory}</span>
                        </div>

                        <div className="mt-6">
                          <div className="text-xl font-bold text-slate-700 sm:text-2xl lg:text-3xl">Nutrition (per serving)</div>
                          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-lg text-slate-700 sm:text-xl lg:text-2xl">
                            <div className="flex items-center justify-between"><span>Calories</span><span className="font-semibold">{product.nutrition.calories}</span></div>
                            <div className="flex items-center justify-between"><span>Protein</span><span className="font-semibold">{product.nutrition.protein}g</span></div>
                            <div className="flex items-center justify-between"><span>Carbs</span><span className="font-semibold">{product.nutrition.carbohydrates}g</span></div>
                            <div className="flex items-center justify-between"><span>Fat</span><span className="font-semibold">{product.nutrition.fat}g</span></div>
                            <div className="flex items-center justify-between"><span>Sugar</span><span className="font-semibold">{product.nutrition.sugar}g</span></div>
                            <div className="flex items-center justify-between"><span>Sodium</span><span className="font-semibold">{product.nutrition.sodium}mg</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  backgroundColor: 'white',
                  padding: '30px',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  overflowX: 'auto',
                  fontSize: '22px'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #ddd', fontSize: '20px', fontWeight: 'bold' }}>Product</th>
                        <th style={{ padding: '16px', textAlign: 'center', borderBottom: '2px solid #ddd', fontSize: '20px', fontWeight: 'bold' }}>Brand</th>
                        <th style={{ padding: '16px', textAlign: 'center', borderBottom: '2px solid #ddd', fontSize: '20px', fontWeight: 'bold' }}>Price</th>
                        <th style={{ padding: '16px', textAlign: 'center', borderBottom: '2px solid #ddd', fontSize: '20px', fontWeight: 'bold' }}>Calories</th>
                        <th style={{ padding: '16px', textAlign: 'center', borderBottom: '2px solid #ddd', fontSize: '20px', fontWeight: 'bold' }}>Protein</th>
                        <th style={{ padding: '16px', textAlign: 'center', borderBottom: '2px solid #ddd', fontSize: '20px', fontWeight: 'bold' }}>Carbs</th>
                        <th style={{ padding: '16px', textAlign: 'center', borderBottom: '2px solid #ddd', fontSize: '20px', fontWeight: 'bold' }}>Fat</th>
                        <th style={{ padding: '16px', textAlign: 'center', borderBottom: '2px solid #ddd', fontSize: '20px', fontWeight: 'bold' }}>Sugar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(product => (
                        <tr key={product.id}>
                          <td style={{ padding: '16px', borderBottom: '1px solid #eee', fontSize: '20px' }}>{product.name}</td>
                          <td style={{ padding: '16px', borderBottom: '1px solid #eee', textAlign: 'center', fontSize: '20px' }}>{product.brand}</td>
                          <td style={{ padding: '16px', borderBottom: '1px solid #eee', textAlign: 'center', fontSize: '20px' }}>₹{product.price}</td>
                          <td style={{ padding: '16px', borderBottom: '1px solid #eee', textAlign: 'center', fontSize: '20px' }}>{product.nutrition.calories}</td>
                          <td style={{ padding: '16px', borderBottom: '1px solid #eee', textAlign: 'center', fontSize: '20px' }}>{product.nutrition.protein}g</td>
                          <td style={{ padding: '16px', borderBottom: '1px solid #eee', textAlign: 'center', fontSize: '20px' }}>{product.nutrition.carbohydrates}g</td>
                          <td style={{ padding: '16px', borderBottom: '1px solid #eee', textAlign: 'center', fontSize: '20px' }}>{product.nutrition.fat}g</td>
                          <td style={{ padding: '16px', borderBottom: '1px solid #eee', textAlign: 'center', fontSize: '20px' }}>{product.nutrition.sugar}g</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Barcode Scanner Modal */}
      {showScanner && (
        <BarcodeScanner
          onScanComplete={handleBarcodeScan}
          onClose={handleCloseScanner}
        />
      )}

      {/* Barcode Result Modal */}
      {scannedProduct && (
        <BarcodeResult
          product={scannedProduct}
          onClose={handleCloseResult}
          onScanAnother={handleScanAnother}
          onAddToComparison={handleAddToComparison}
        />
      )}

      {/* Search Result Modal */}
      {searchedProduct && (
        <BarcodeResult
          product={searchedProduct}
          onClose={handleCloseSearchResult}
          onScanAnother={() => {
            setSearchedProduct(null);
            setShowScanner(true);
          }}
          onAddToComparison={handleAddToComparison}
        />
      )}

    </div>
  );
}

export default App;
