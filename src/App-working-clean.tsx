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
function App() {
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
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=300&h=200&fit=crop'
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
    image: 'https://sl.bing.net/evrnTxPiw7U'
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
  {
    id: 'kitkat',
    name: 'KitKat Chocolate',
    brand: 'KitKat',
    category: 'Chocolates',
    itemKey: 'chocolate-milk',
    nutrition: { calories: 210, protein: 2.5, carbohydrates: 24, fat: 11, fiber: 0.8, sugar: 20, sodium: 30 },
    price: 25,
    image: 'https://images.unsplash.com/photo-1511381939415-c1c0d0e6c7b5?w=800&h=600&fit=crop'
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

  const [showScanner, setShowScanner] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<BarcodeProduct | null>(null);
  const [searchedProduct, setSearchedProduct] = useState<BarcodeProduct | null>(null);

  const [activeTab, setActiveTab] =
    useState<'browse' | 'compare' | 'diet'>('browse');

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

  const handleBarcodeScan = (barcode: string) => {
    const product = lookupProductByBarcode(barcode);
    if (product) {
      setScannedProduct(product);
      setShowScanner(false);
    } else {
      alert('Product not found');
    }
  };

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

  const fallbackImage =
    'https://images.unsplash.com/photo-1546069901-b9f581a1996d?w=800';

  /* ---------------- JSX ---------------- */

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* ---------------- HEADER ---------------- */}
      <div className="mb-8 text-center">
        <h1 className="text-8xl font-bold text-indigo-600 mb-2">NutriDSA</h1>
        <p className="text-2xl text-slate-600">Your Personal Nutrition & Diet Assistant</p>
      </div>

      {/* ---------------- TAB NAVIGATION ---------------- */}
      <div className="mb-8 rounded-2xl bg-white p-2 shadow">
        <div className="flex gap-2">
          {['browse', 'compare', 'diet'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 rounded-xl py-3 font-bold text-lg ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- BROWSE ---------------- */}
      {activeTab === 'browse' && (
        <div className="rounded-2xl bg-white p-6 shadow">

          <ProductSearch onProductSelect={setSearchedProduct} />

          <button
            onClick={() => setShowScanner(true)}
            className="mt-4 rounded-xl bg-green-600 px-8 py-4 text-white font-bold text-xl"
          >
            Scan Barcode
          </button>

          <div className="mt-6">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="mt-4 rounded-xl border p-4 w-full text-lg"
            >
              {categories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="rounded-xl border shadow hover:shadow-lg transition"
              >
                <img
                  src={`${product.image}?v=${cacheBust}`}
                  onError={e => (e.currentTarget.src = fallbackImage)}
                  className="h-48 w-full object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="text-3xl font-bold">{product.name}</h3>
                  <p className="text-xl text-slate-600">{product.brand}</p>
                  <p className="font-bold mt-2 text-2xl">₹{product.price}</p>
                  
                  {/* Nutrition Information */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Nutrition per serving:</h4>
                    <div className="grid grid-cols-2 gap-2 text-lg">
                      <div className="flex justify-between">
                        <span className="text-slate-600 text-lg">Calories:</span>
                        <span className="font-medium text-lg">{product.nutrition.calories}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 text-lg">Protein:</span>
                        <span className="font-medium text-lg">{product.nutrition.protein}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 text-lg">Carbs:</span>
                        <span className="font-medium text-lg">{product.nutrition.carbohydrates}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 text-lg">Fat:</span>
                        <span className="font-medium text-lg">{product.nutrition.fat}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 text-lg">Sugar:</span>
                        <span className="font-medium text-lg">{product.nutrition.sugar}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 text-lg">Sodium:</span>
                        <span className="font-medium text-lg">{product.nutrition.sodium}mg</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2">
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
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg text-lg font-medium transition-colors"
                    >
                      Add to Compare
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
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-lg font-medium transition-colors"
                    >
                      Add to Diet
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 h-80">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="brand" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="calories" fill="#6366f1" />
                <Bar dataKey="protein" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ---------------- COMPARE ---------------- */}
      {activeTab === 'compare' && (
        <ProductComparison 
          products={comparisonProducts}
          onRemoveProduct={handleRemoveProduct}
          onClearAll={handleClearComparison}
        />
      )}

      {/* ---------------- DIET ---------------- */}
      {activeTab === 'diet' && (
        <DietTracker 
          items={dietItems}
          onAddItem={handleAddDietItem}
          onRemoveItem={handleRemoveDietItem}
          onUpdateQuantity={handleUpdateQuantity}
          onClearAll={handleClearDiet}
        />
      )}

      {/* ---------------- MODALS ---------------- */}
      {showScanner && (
        <BarcodeScanner
          onScanComplete={handleBarcodeScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      {scannedProduct && (
        <BarcodeResult
          product={scannedProduct}
          onClose={() => setScannedProduct(null)}
          onScanAnother={() => {
            setScannedProduct(null);
            setShowScanner(true);
          }}
        />
      )}

      {searchedProduct && (
        <BarcodeResult
          product={searchedProduct}
          onClose={() => setSearchedProduct(null)}
          onScanAnother={() => setSearchedProduct(null)}
        />
      )}
    </div>
  );
}

export default App;
