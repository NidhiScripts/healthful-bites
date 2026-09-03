import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useDiet } from '@/context/DietContext';
import { useComparison } from '@/context/ComparisonContext';
import { productService, UnifiedProduct } from '@/api/productService';
import {
  calculateNutriDsaHealthScore,
  normalizeNutritionPer100g,
  generateComparisonVerdict,
  ComparisonItemAnalysis,
  HealthRatingLabel
} from '@/utils/nutriDsaScore';
import { toast } from 'sonner';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import {
  Scale,
  Search,
  Check,
  Plus,
  X,
  Sparkles,
  ArrowRight,
  Flame,
  Dna,
  HeartPulse,
  Info,
  Trash2,
  Layers,
  BarChart3,
  Award,
  AlertTriangle,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { FoodItem } from '@/data/foodData';

type NutritionMetric = 'calories' | 'protein' | 'carbs' | 'fat' | 'saturatedFat' | 'sugar' | 'sodium' | 'fiber';

const metricLabels: Record<NutritionMetric, { label: string; unit: string; color: string }> = {
  calories: { label: 'Calories', unit: 'kcal/100g', color: '#10b981' },
  protein: { label: 'Protein', unit: 'g/100g', color: '#06b6d4' },
  sugar: { label: 'Sugar', unit: 'g/100g', color: '#f59e0b' },
  fiber: { label: 'Fiber', unit: 'g/100g', color: '#10b981' },
  saturatedFat: { label: 'Sat Fat', unit: 'g/100g', color: '#ec4899' },
  fat: { label: 'Total Fat', unit: 'g/100g', color: '#f43f5e' },
  carbs: { label: 'Carbs', unit: 'g/100g', color: '#8b5cf6' },
  sodium: { label: 'Sodium', unit: 'mg/100g', color: '#ef4444' },
};

const getScoreColor = (score: number) => {
  if (score >= 85) return 'text-emerald-700 bg-emerald-100 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300';
  if (score >= 70) return 'text-teal-700 bg-teal-100 border-teal-300 dark:bg-teal-950 dark:text-teal-300';
  if (score >= 55) return 'text-amber-700 bg-amber-100 border-amber-300 dark:bg-amber-950 dark:text-amber-300';
  if (score >= 40) return 'text-orange-700 bg-orange-100 border-orange-300 dark:bg-orange-950 dark:text-orange-300';
  return 'text-rose-700 bg-rose-100 border-rose-300 dark:bg-rose-950 dark:text-rose-300';
};

const getScoreBadgeBg = (score: number) => {
  if (score >= 85) return 'bg-emerald-600 text-white';
  if (score >= 70) return 'bg-teal-600 text-white';
  if (score >= 55) return 'bg-amber-500 text-white';
  if (score >= 40) return 'bg-orange-500 text-white';
  return 'bg-rose-600 text-white';
};

const BrandComparisonSimple: React.FC = () => {
  const navigate = useNavigate();
  const { addFoodToLog } = useDiet();
  const { comparisonItems, removeFromComparison, clearComparison, addToComparison, isInComparison } = useComparison();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UnifiedProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeChartMetric, setActiveChartMetric] = useState<NutritionMetric>('protein');

  // Search handler for adding items to the matrix
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (!val.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    productService.searchProducts(val.trim()).then((results) => {
      setSearchResults(results.slice(0, 6));
      setIsSearching(false);
    });
  };

  // Convert each comparison item to normalized 100g analysis
  const normalizedAnalyses: ComparisonItemAnalysis[] = useMemo(() => {
    return comparisonItems.map((p) => {
      const nutrition100g = p.nutrition100g || normalizeNutritionPer100g(p.nutrition, p.servingSize, p.source === 'openfoodfacts');
      if (p.novaGroup && !nutrition100g.nova) nutrition100g.nova = p.novaGroup;
      const rating = calculateNutriDsaHealthScore(nutrition100g);
      return {
        id: p.id,
        name: p.name,
        brand: p.brand || 'Generic',
        nutrition100g,
        rating,
      };
    });
  }, [comparisonItems]);

  // Compute the definitive Comparison Verdict statement and badges
  const verdict = useMemo(() => {
    return generateComparisonVerdict(normalizedAnalyses);
  }, [normalizedAnalyses]);

  // Chart data for selected items normalized per 100g
  const chartData = useMemo(() => {
    return normalizedAnalyses.map((item) => ({
      name: item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name,
      fullName: item.name,
      brand: item.brand,
      value: item.nutrition100g[activeChartMetric] != null ? item.nutrition100g[activeChartMetric] : 0,
      id: item.id,
    }));
  }, [normalizedAnalyses, activeChartMetric]);

  // Log product into daily tracker
  const handleLogFood = (product: UnifiedProduct) => {
    addFoodToLog({
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      servingSize: product.servingSize,
      calories: product.nutrition?.calories || 0,
      protein: product.nutrition?.protein || 0,
      carbs: product.nutrition?.carbohydrates || 0,
      fat: product.nutrition?.fat || 0,
      fiber: product.nutrition?.fiber || 0,
      sodium: product.nutrition?.sodium || 0,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 pb-20 transition-colors">
      <Navbar />

      <main className="container mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-emerald-900/10 mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-100 text-xs font-semibold mb-3 border border-white/20">
                <Scale className="w-3.5 h-3.5" />
                <span>Standardized 100g Nutrition Matrix</span>
              </div>
              
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
                Side-by-Side Brand Comparison
              </h1>
              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                Every product is normalized per 100g to ensure fair, transparent comparisons. Powered by transparent 0–100 Health Scoring.
              </p>
            </div>

            {comparisonItems.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={clearComparison}
                  className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Matrix</span>
                </button>

                <Link
                  to="/search"
                  className="px-4 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs flex items-center gap-1.5 shadow-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Browse More</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Search & Add Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm p-5 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>Add Products to Comparison (Max 4)</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Search food items to immediately include them in the normalized matrix.
              </p>
            </div>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {comparisonItems.length}/4 Items in Matrix
            </span>
          </div>

          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products to compare (e.g. Maggi, Yippee, Masala Dosa, Lay's, Amul)..."
              value={searchQuery}
              onChange={handleSearchChange}
              disabled={comparisonItems.length >= 4}
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all disabled:opacity-50"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Inline Search Results Dropdown / Grid */}
          {searchQuery && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 animate-in fade-in">
              {isSearching ? (
                <div className="py-6 text-center text-xs text-slate-500">Searching products...</div>
              ) : searchResults.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-500">
                  No matching products found for "{searchQuery}".
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {searchResults.map((item) => {
                    const alreadyIn = isInComparison(item.id);
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 transition-colors"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 p-1 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                            ) : (
                              <Leaf className="w-5 h-5 text-slate-300" />
                            )}
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-slate-500 truncate">{item.brand} • {item.category}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (alreadyIn) {
                              removeFromComparison(item.id);
                            } else {
                              addToComparison(item);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1 transition-all ${
                            alreadyIn
                              ? 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300 hover:bg-rose-100'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                          }`}
                        >
                          {alreadyIn ? (
                            <>
                              <X className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Matrix State Display */}
        {comparisonItems.length === 0 ? (
          /* Empty Matrix State */
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm p-12 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100 dark:border-emerald-800">
              <Scale className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Your Comparison Matrix is Empty
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              No products are preloaded. Search for foods using the search bar above or from the Search page and click the <strong className="text-emerald-600 font-semibold">Compare</strong> (⚖️) button to add items here.
            </p>

            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Explore & Search Products</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in">

            {/* Verdict Statement Banner */}
            {comparisonItems.length >= 2 && (
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/60 dark:via-teal-950/40 dark:to-cyan-950/40 border-2 border-emerald-200 dark:border-emerald-800 rounded-3xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      Health Comparison Verdict
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 mb-2">
                      {verdict.statement}
                    </h3>
                    
                    {verdict.details.length > 0 && (
                      <ul className="space-y-1 mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        {verdict.details.map((d, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Selected Product Cards Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  <span>Compared Products ({comparisonItems.length})</span>
                </h2>

                {comparisonItems.length === 1 && (
                  <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800 font-medium flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" /> Add at least 1 more product to complete side-by-side matrix
                  </span>
                )}
              </div>

              <div className={`grid gap-6 ${
                comparisonItems.length === 1
                  ? 'grid-cols-1 max-w-sm'
                  : comparisonItems.length === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : comparisonItems.length === 3
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}>
                {normalizedAnalyses.map((item, idx) => {
                  const product = comparisonItems[idx];
                  const n = item.nutrition100g;

                  return (
                    <div
                      key={item.id}
                      className="relative bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between"
                    >
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => removeFromComparison(item.id)}
                        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors z-10"
                        title="Remove from matrix"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div>
                        {/* Product Image */}
                        <div className="h-40 w-full bg-slate-50 dark:bg-slate-900 rounded-2xl p-3 mb-4 flex items-center justify-center">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <Leaf className="w-8 h-8 text-slate-300" />
                          )}
                        </div>

                        {/* Header tags */}
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                            {product.brand}
                          </span>
                          <span className="text-sm font-extrabold text-emerald-600">
                            ₹{product.price || 20}
                          </span>
                        </div>

                        <Link to={`/food/${product.id}`} className="hover:text-emerald-600 transition-colors">
                          <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2 mb-1 leading-snug">
                            {product.name}
                          </h3>
                        </Link>

                        {/* NutriDSA Health Score Pill */}
                        <div className="my-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                              Health Score
                            </span>
                            <span className={`px-2 py-0.5 rounded-lg text-xs font-black ${getScoreBadgeBg(item.rating.score)}`}>
                              {item.rating.score}/100 • {item.rating.label}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5">
                            <span>Normalized basis (100g)</span>
                            <span>Confidence: {item.rating.confidence}%</span>
                          </div>
                        </div>

                        {/* Normalized 100g Macro Grid */}
                        <div className="grid grid-cols-3 gap-1.5 p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl text-center text-xs mb-4">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-slate-400 block">Calories</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">
                              {n.calories != null ? `${n.calories}` : 'N/A'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-bold text-slate-400 block">Protein</span>
                            <span className="font-bold text-cyan-600">
                              {n.protein != null ? `${n.protein}g` : 'N/A'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-bold text-slate-400 block">Sugar</span>
                            <span className="font-bold text-amber-600">
                              {n.sugar != null ? `${n.sugar}g` : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 pt-2">
                        <Link
                          to={`/food/${product.id}`}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs text-center transition-colors"
                        >
                          Details
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleLogFood(product)}
                          className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Log</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Side-by-Side Matrix Table */}
            {comparisonItems.length >= 2 && (
              <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm p-6 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Scale className="w-5 h-5 text-emerald-600" />
                    <span>Normalized per 100g Nutrition Matrix</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Normalized basis guarantees fair comparison regardless of pack sizes. Directional badges highlight meaningful nutritional advantages.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-900 font-bold text-slate-800 dark:text-slate-200">
                        <th className="p-4 border-b border-slate-200 dark:border-slate-700 min-w-[190px]">Metric (per 100g)</th>
                        {normalizedAnalyses.map((item) => (
                          <th key={item.id} className="p-4 border-b border-slate-200 dark:border-slate-700 min-w-[190px]">
                            <div className="font-bold text-slate-900 dark:text-white truncate">{item.name}</div>
                            <div className="text-[11px] font-semibold text-emerald-600">{item.brand}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {/* Health Score */}
                      <tr className="bg-emerald-50/50 dark:bg-emerald-950/20">
                        <td className="p-4 font-bold text-emerald-800 dark:text-emerald-300">
                          <div>Health Score (0–100)</div>
                          <div className="text-[10px] font-normal text-slate-500">Transparent nutrient density score</div>
                        </td>
                        {normalizedAnalyses.map((item) => (
                          <td key={item.id} className="p-4">
                            <span className={`inline-block px-3 py-1 rounded-xl text-xs font-black ${getScoreBadgeBg(item.rating.score)}`}>
                              {item.rating.score}/100 ({item.rating.label})
                            </span>
                            <div className="text-[10px] text-slate-500 mt-1">
                              Data Confidence: {item.rating.confidence}%
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Official Nutri-Score & NOVA Group */}
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="p-4 font-semibold text-slate-600 dark:text-slate-400">
                          <div>Official Scores</div>
                          <div className="text-[10px] font-normal text-slate-400">Open Food Facts</div>
                        </td>
                        {comparisonItems.map((p) => (
                          <td key={p.id} className="p-4 text-xs font-medium space-y-1">
                            <div>
                              Nutri-Score:{' '}
                              {p.nutriscoreGrade ? (
                                <span className="font-black uppercase px-2 py-0.5 rounded bg-emerald-600 text-white text-[11px]">
                                  {p.nutriscoreGrade}
                                </span>
                              ) : (
                                <span className="text-slate-400">N/A</span>
                              )}
                            </div>
                            <div>
                              NOVA Group:{' '}
                              {p.novaGroup ? (
                                <span className="font-bold text-slate-800 dark:text-slate-200">
                                  Group {p.novaGroup}
                                </span>
                              ) : (
                                <span className="text-slate-400">Unspecified</span>
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Protein */}
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="p-4 font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <Dna className="w-4 h-4 text-cyan-500" /> Protein
                        </td>
                        {normalizedAnalyses.map((item) => {
                          const badge = verdict.badges[item.id]?.protein;
                          return (
                            <td key={item.id} className="p-4">
                              <span className="font-bold text-cyan-600 dark:text-cyan-400">
                                {item.nutrition100g.protein != null ? `${item.nutrition100g.protein}g` : 'N/A'}
                              </span>
                              {badge && (
                                <span className="ml-2 inline-flex items-center text-[10px] font-bold text-cyan-700 bg-cyan-100 dark:bg-cyan-950 dark:text-cyan-300 px-2 py-0.5 rounded-full">
                                  {badge}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>

                      {/* Fiber */}
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="p-4 font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <Leaf className="w-4 h-4 text-emerald-500" /> Dietary Fiber
                        </td>
                        {normalizedAnalyses.map((item) => {
                          const badge = verdict.badges[item.id]?.fiber;
                          return (
                            <td key={item.id} className="p-4">
                              <span className="font-bold text-slate-800 dark:text-slate-200">
                                {item.nutrition100g.fiber != null ? `${item.nutrition100g.fiber}g` : 'N/A'}
                              </span>
                              {badge && (
                                <span className="ml-2 inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                                  {badge}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>

                      {/* Sugar */}
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="p-4 font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <HeartPulse className="w-4 h-4 text-amber-500" /> Sugar
                        </td>
                        {normalizedAnalyses.map((item) => {
                          const badge = verdict.badges[item.id]?.sugar;
                          return (
                            <td key={item.id} className="p-4">
                              <span className="font-bold text-slate-800 dark:text-slate-200">
                                {item.nutrition100g.sugar != null ? `${item.nutrition100g.sugar}g` : 'N/A'}
                              </span>
                              {badge && (
                                <span className="ml-2 inline-flex items-center text-[10px] font-bold text-amber-700 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-full">
                                  {badge}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>

                      {/* Sodium */}
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="p-4 font-semibold text-slate-600 dark:text-slate-400">Sodium</td>
                        {normalizedAnalyses.map((item) => {
                          const badge = verdict.badges[item.id]?.sodium;
                          return (
                            <td key={item.id} className="p-4">
                              <span className="font-bold text-rose-500">
                                {item.nutrition100g.sodium != null ? `${item.nutrition100g.sodium}mg` : 'N/A'}
                              </span>
                              {badge && (
                                <span className="ml-2 inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                                  {badge}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>

                      {/* Saturated Fat */}
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="p-4 font-semibold text-slate-600 dark:text-slate-400">Saturated Fat</td>
                        {normalizedAnalyses.map((item) => {
                          const badge = verdict.badges[item.id]?.saturatedFat;
                          return (
                            <td key={item.id} className="p-4">
                              <span className="font-bold text-slate-800 dark:text-slate-200">
                                {item.nutrition100g.saturatedFat != null ? `${item.nutrition100g.saturatedFat}g` : 'N/A'}
                              </span>
                              {badge && (
                                <span className="ml-2 inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                                  {badge}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>

                      {/* Total Fat */}
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="p-4 font-semibold text-slate-600 dark:text-slate-400">Total Fat</td>
                        {normalizedAnalyses.map((item) => (
                          <td key={item.id} className="p-4 font-bold text-slate-800 dark:text-slate-200">
                            {item.nutrition100g.fat != null ? `${item.nutrition100g.fat}g` : 'N/A'}
                          </td>
                        ))}
                      </tr>

                      {/* Carbohydrates (neutral - no winner badge) */}
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="p-4 font-semibold text-slate-600 dark:text-slate-400">
                          <div>Carbohydrates</div>
                          <div className="text-[10px] font-normal text-slate-400">Energy source (neutral)</div>
                        </td>
                        {normalizedAnalyses.map((item) => (
                          <td key={item.id} className="p-4 font-bold text-slate-800 dark:text-slate-200">
                            {item.nutrition100g.carbs != null ? `${item.nutrition100g.carbs}g` : 'N/A'}
                          </td>
                        ))}
                      </tr>

                      {/* Calories (Energy Density) */}
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="p-4 font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <Flame className="w-4 h-4 text-emerald-500" /> Energy Density
                        </td>
                        {normalizedAnalyses.map((item) => (
                          <td key={item.id} className="p-4 font-bold text-slate-900 dark:text-white">
                            {item.nutrition100g.calories != null ? `${item.nutrition100g.calories} kcal` : 'N/A'}
                          </td>
                        ))}
                      </tr>

                      {/* Ingredients */}
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="p-4 font-semibold text-slate-600 dark:text-slate-400">Ingredients</td>
                        {comparisonItems.map((p) => (
                          <td key={p.id} className="p-4 text-xs text-slate-600 dark:text-slate-300 max-w-xs">
                            {p.ingredients && p.ingredients.length > 0 ? (
                              <p className="line-clamp-3">{p.ingredients.join(', ')}</p>
                            ) : (
                              'Not specified'
                            )}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Interactive Bar Chart for Selected Items */}
            {comparisonItems.length >= 2 && (
              <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm p-6 sm:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-xs mb-1">
                      <BarChart3 className="w-4 h-4" />
                      <span>Visual 100g Metric Chart</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      Nutrient Comparison Chart (per 100g)
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      Comparing {comparisonItems.length} items across {metricLabels[activeChartMetric].label}
                    </p>
                  </div>

                  {/* Switcher pills */}
                  <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                    {(Object.keys(metricLabels) as NutritionMetric[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setActiveChartMetric(m)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                          activeChartMetric === m
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {metricLabels[m].label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-72 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 11 }}
                        unit={` ${metricLabels[activeChartMetric].unit.split('/')[0]}`}
                      />
                      <Tooltip
                        cursor={{ fill: 'rgba(16, 185, 129, 0.05)' }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs">
                                <p className="font-bold text-emerald-400">{data.fullName}</p>
                                <p className="text-slate-300 text-[11px] mb-1">{data.brand}</p>
                                <p className="text-sm font-extrabold mt-1">
                                  {metricLabels[activeChartMetric].label}:{' '}
                                  <span className="text-emerald-300">
                                    {data.value} {metricLabels[activeChartMetric].unit}
                                  </span>
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill={metricLabels[activeChartMetric].color}
                        radius={[8, 8, 0, 0]}
                        barSize={48}
                      >
                        {chartData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={metricLabels[activeChartMetric].color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrandComparisonSimple;
