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

/* ---------------- MOCK DATA ---------------- */

const mockProducts = [
  {
    id: 'maggi',
    name: 'Maggi 2-Minute Noodles',
    brand: 'Maggi',
    category: 'Instant Noodles',
    itemKey: 'noodles',
    nutrition: { calories: 380, protein: 8, carbohydrates: 56, fat: 15, sugar: 2, sodium: 850 },
    price: 15,
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800',
  },
  {
    id: 'yippee',
    name: 'Yippee Noodles',
    brand: 'Yippee',
    category: 'Instant Noodles',
    itemKey: 'noodles',
    nutrition: { calories: 390, protein: 7, carbohydrates: 58, fat: 16, sugar: 2, sodium: 820 },
    price: 12,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
  },
];

const fallbackImage =
  'https://images.unsplash.com/photo-1546069901-b9f581a1996d?w=800';

/* ---------------- APP ---------------- */

function App() {
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

  // Product comparison state
  const [comparisonProducts, setComparisonProducts] = useState<BarcodeProduct[]>([]);

  // Diet tracker state
  const [dietItems, setDietItems] = useState<any[]>([]);

  /* ---------------- DERIVED DATA ---------------- */

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(
      p => p.category === selectedCategory && p.itemKey === selectedItemKey
    );
  }, [selectedCategory, selectedItemKey]);

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

  /* ---------------- JSX ---------------- */

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ---------------- TAB NAVIGATION ---------------- */}
      <div className="mb-8 rounded-2xl bg-white p-2 shadow">
        <div className="flex gap-2">
          {['browse', 'compare', 'diet'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 rounded-xl py-3 font-bold ${activeTab === tab
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


          <div className="mt-6">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="rounded-xl border p-3 w-full"
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
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-slate-600">{product.brand}</p>
                  <p className="font-bold mt-2">₹{product.price}</p>
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

      {searchedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full">
            <h2 className="text-3xl font-bold mb-4">{searchedProduct.name}</h2>
            <button
              onClick={() => setSearchedProduct(null)}
              className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
