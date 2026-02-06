import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import {
  Download,
  Share2,
  ThumbsDown,
  ThumbsUp,
  ShoppingCart,
  Plus,
  Search,
  ChevronDown,
  LogOut
} from 'lucide-react';
import barcodeDatabase, { BarcodeProduct } from '@/data/barcodeDatabase';

const categories = [
  'Instant Noodles',
  'Chips & Salty Snacks',
  'Chocolates',
  'Dairy Products (Packed)',
  'Biscuits & Cookies'
];

const BrandComparison: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('Instant Noodles');
  const [activeTab, setActiveTab] = useState<'browse' | 'compare' | 'logout'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredProducts = useMemo(() => {
    return barcodeDatabase.filter(p => {
      const matchesCategory = p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const chartData = useMemo(() => {
    return filteredProducts.map((p) => ({
      brand: p.brand.split(' ')[0],
      calories: p.nutrition.calories,
    }));
  }, [filteredProducts]);

  return (
    <div className="min-h-screen bg-slate-200 font-sans flex justify-center">
      <div className="w-full max-w-md bg-slate-50 min-h-screen shadow-2xl overflow-hidden relative pb-10">
        {/* Header Section */}
        <div className="pt-10 pb-6 text-center relative px-4">
          <button
            onClick={handleLogout}
            className="absolute top-10 right-6 text-slate-400 hover:text-[#6366f1] transition-colors flex items-center gap-2"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-bold text-[10px] uppercase tracking-wider">Logout</span>
          </button>
          <h1 className="text-5xl font-black text-[#6366f1] tracking-tight">NutriDSA</h1>
          <p className="mt-2 text-sm text-slate-500 font-medium px-4">Your Personal Nutrition & Diet Assistant</p>
        </div>

        {/* Tab Navigation */}
        <div className="mx-auto max-w-4xl px-4 mb-8">
          <div className="flex bg-slate-100 rounded-2xl p-1 shadow-sm">
            {['browse', 'compare', 'logout'].map(tab => (
              <button
                key={tab}
                onClick={() => {
                  if (tab === 'logout') handleLogout();
                  else setActiveTab(tab as any);
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all ${activeTab === tab
                  ? 'bg-[#6366f1] text-white shadow-lg'
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4">
          {/* Search Bar */}
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-10 rounded-2xl border-2 border-slate-100 bg-white text-lg shadow-sm focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/10 outline-none transition-all"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>

          {/* Category Selector */}
          <div className="mb-8 relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border-2 border-slate-100 shadow-sm font-bold text-slate-700 hover:border-[#6366f1] transition-colors"
            >
              {selectedCategory}
              <ChevronDown className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showCategoryDropdown && (
              <div className="absolute top-12 left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2 animate-in fade-in slide-in-from-top-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors ${selectedCategory === cat ? 'text-[#6366f1] font-bold' : 'text-slate-600'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredProducts.map(product => (
              <div key={product.barcode} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">{product.name}</h3>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-3xl font-black text-[#6366f1] font-mono">₹{product.price}</span>
                  </div>

                  {/* Nutrition Grid */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 mb-6 border-t border-slate-50 pt-4">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-500 font-medium text-sm">Calories</span>
                      <span className="font-bold text-slate-900 text-sm">{product.nutrition.calories}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-500 font-medium text-sm">Carbs</span>
                      <span className="font-bold text-slate-900 text-sm">{product.nutrition.carbohydrates}g</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-500 font-medium text-sm">Protein</span>
                      <span className="font-bold text-slate-900 text-sm">{product.nutrition.protein}g</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-500 font-medium text-sm">Fat</span>
                      <span className="font-bold text-slate-900 text-sm">{product.nutrition.fat}g</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-500 font-medium text-sm">Sugar</span>
                      <span className="font-bold text-slate-700 text-sm">{product.nutrition.sugar}g</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-500 font-medium text-sm">Sodium</span>
                      <span className="font-bold text-slate-900 text-sm">{product.nutrition.sodium}mg</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 h-12 bg-[#6366f1] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#5254e0] transition-colors">
                      <Plus className="w-5 h-5" />
                      Add Compare
                    </button>
                    <button className="w-32 h-12 bg-[#22c55e] text-white rounded-xl flex items-center justify-center hover:bg-[#1ca84d] transition-colors">
                      <ShoppingCart className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="text-center mt-2">
                    <button className="text-sm font-bold text-[#22c55e] hover:underline">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Chart */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-8 mb-12">
            <div className="h-[200px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="brand" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <Bar
                    dataKey="calories"
                    fill="#6366f1"
                    radius={[4, 4, 0, 0]}
                    barSize={60}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full h-1 bg-slate-900 mt-0"></div>
          </div>

          {/* Footer Icons */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-200 overflow-x-auto gap-4">
            <div className="flex gap-8">
              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <ThumbsUp className="w-10 h-10" />
              </button>
              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <ThumbsDown className="w-10 h-10" />
              </button>
              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <Download className="w-10 h-10" />
              </button>
            </div>
            <button className="flex items-center gap-4 text-slate-400 hover:text-slate-600 transition-colors group whitespace-nowrap">
              <Share2 className="w-10 h-10" />
              <span className="text-3xl font-black text-slate-400 group-hover:text-slate-600 tracking-tighter">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandComparison;
