import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Search as SearchIcon,
  Camera,
  Filter,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Leaf,
  ShieldAlert,
  Scale,
  Check,
  Plus,
  X,
  Flame,
  TrendingUp,
  Award
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { productService, UnifiedProduct } from '@/api/productService';
import BarcodeScanner from '@/components/BarcodeScanner';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useComparison } from '@/context/ComparisonContext';

const trendingKeywords = [
  'Maggi',
  'Masala Dosa',
  'Parle-G',
  'Amul Butter',
  'Yippee',
  'Tropicana',
  'Kurkure',
  'Poha',
  'Lay\'s'
];

const getScoreBadgeColor = (score: number) => {
  if (score >= 85) return 'bg-emerald-600 text-white';
  if (score >= 70) return 'bg-teal-600 text-white';
  if (score >= 55) return 'bg-amber-500 text-white';
  if (score >= 40) return 'bg-orange-500 text-white';
  return 'bg-rose-600 text-white';
};

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toggleComparison, isInComparison, totalItems: totalCompareItems, clearComparison } = useComparison();

  const queryFromUrl = searchParams.get('q') || '';
  const [query, setQuery] = useState(queryFromUrl);
  const [searchResults, setSearchResults] = useState<UnifiedProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync state if URL changes
  useEffect(() => {
    setQuery(queryFromUrl);
    if (queryFromUrl.trim()) {
      performSearch(queryFromUrl);
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [queryFromUrl]);

  const performSearch = (searchTerm: string) => {
    const clean = searchTerm.trim();
    if (!clean) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    productService.searchProducts(clean).then((data) => {
      setSearchResults(data);
      setIsLoading(false);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce search by 400ms to avoid spamming search API requests
    debounceTimerRef.current = setTimeout(() => {
      setSearchParams(val ? { q: val } : {});
    }, 400);
  };

  const handleQuickKeywordClick = (keyword: string) => {
    setQuery(keyword);
    setSearchParams({ q: keyword });
  };

  const handleBarcodeScanned = (barcode: string) => {
    setIsScannerOpen(false);
    navigate(`/food/${barcode}`);
  };

  const categories = ['all', 'snacks', 'beverages', 'dairy', 'breakfast', 'pantry'];

  // Featured/browse products when search is empty
  const defaultFeaturedProducts = useMemo(() => {
    return productService.getFeaturedProducts(selectedCategory);
  }, [selectedCategory]);

  // Displayed products (either search results or featured products)
  const displayProducts = useMemo(() => {
    if (query.trim()) {
      return selectedCategory === 'all'
        ? searchResults
        : searchResults.filter((r) => r.category.toLowerCase().includes(selectedCategory));
    }
    return defaultFeaturedProducts;
  }, [query, searchResults, selectedCategory, defaultFeaturedProducts]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-28">
      <Navbar />

      <main className="container mx-auto max-w-5xl px-4 py-8">
        {/* Search Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-10 text-white shadow-lg mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Explore 3 Million+ Food Items
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base mb-6">
              Instant nutrition verification, transparent health scores, allergen alerts, and brand comparisons.
            </p>

            {/* Big Search Input */}
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search food by name, brand (e.g. Lay's, Oatly, Nutella), or scan barcode..."
                value={query}
                onChange={handleInputChange}
                className="w-full bg-white text-slate-800 placeholder-slate-400 pl-11 pr-24 py-3.5 rounded-2xl text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-emerald-300 shadow-xl"
              />
              <SearchIcon className="w-5 h-5 text-slate-400 absolute left-4" />

              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    setSearchParams({});
                  }}
                  className="absolute right-20 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="absolute right-2 px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Scan</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <BarcodeScanner onDetected={handleBarcodeScanned} onClose={() => setIsScannerOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Trending Quick Search Pills */}
            <div className="flex items-center gap-1.5 flex-wrap mt-4 text-xs">
              <span className="text-emerald-200 flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" /> Popular:
              </span>
              {trendingKeywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => handleQuickKeywordClick(kw)}
                  className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-emerald-50 text-[11px] font-medium transition-colors backdrop-blur-sm"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {query.trim() ? (
                <>
                  <SearchIcon className="w-5 h-5 text-emerald-600" />
                  <span>Search Results for "{query}"</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span>Popular & Recommended Foods</span>
                </>
              )}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {query.trim()
                ? `Showing ${displayProducts.length} matching products`
                : `Showing ${displayProducts.length} items from database (normalized per 100g)`}
            </p>
          </div>
        </div>

        {/* Search Results / Browse Grid */}
        {isLoading ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Searching food databases...</p>
          </div>
        ) : query.trim() && displayProducts.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center shadow-sm border border-slate-100 dark:border-slate-700">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">No Matching Products Found</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-4">
              We couldn't find matches for "<span className="font-medium text-slate-700">{query}</span>". Try searching by brand, product name, or barcode.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setSearchParams({});
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => {
              const inComparison = isInComparison(product.id);
              const score = product.nutriDsaScore || product.healthScore || 70;

              return (
                <div
                  key={product.id}
                  className={`bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm border transition-all flex flex-col justify-between ${
                    inComparison
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                      : 'border-slate-200/80 dark:border-slate-700 hover:shadow-lg'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                        {product.brand}
                      </span>
                      
                      {/* NutriDSA Score Badge */}
                      <span className={`px-2 py-0.5 rounded-lg text-[11px] font-black ${getScoreBadgeColor(score)}`}>
                        {score}/100
                      </span>
                    </div>

                    {/* Image & Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-700 p-2 border border-slate-100 dark:border-slate-600 flex items-center justify-center shrink-0">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <Leaf className="w-6 h-6 text-slate-300" />
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <Link to={`/food/${product.id}`} className="hover:text-emerald-600 transition-colors">
                          <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 text-sm leading-snug">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-slate-400 capitalize mt-0.5">
                          {product.category} {product.price ? `• ₹${product.price}` : ''}
                        </p>
                      </div>
                    </div>

                    {/* Nutrition Highlights */}
                    {product.nutrition ? (
                      <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-700/30 p-2.5 rounded-xl text-center text-xs mb-4">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Calories</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {product.nutrition.calories !== undefined ? `${product.nutrition.calories}` : 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">Protein</span>
                          <span className="font-bold text-cyan-600">
                            {product.nutrition.protein !== undefined ? `${product.nutrition.protein}g` : 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">Sugar</span>
                          <span className="font-bold text-amber-600">
                            {product.nutrition.sugar !== undefined ? `${product.nutrition.sugar}g` : 'N/A'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 dark:bg-slate-700/30 p-2 rounded-xl text-center text-xs text-slate-400 mb-4">
                        Nutrition info unavailable
                      </div>
                    )}
                  </div>

                  {/* Actions: View Details & Compare */}
                  <div className="flex gap-2 pt-2">
                    <Link
                      to={`/food/${product.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 font-semibold text-xs transition-colors border border-slate-200 dark:border-slate-600"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleComparison(product)}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        inComparison
                          ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                      }`}
                    >
                      {inComparison ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Matrix</span>
                        </>
                      ) : (
                        <>
                          <Scale className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300" />
                          <span>Compare</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Bottom Comparison Dock */}
      {totalCompareItems > 0 && (
        <div className="fixed bottom-6 inset-x-0 z-40 px-4 flex justify-center pointer-events-none">
          <div className="pointer-events-auto bg-slate-900/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4 max-w-xl w-full justify-between animate-in fade-in slide-in-from-bottom-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-sm">
                {totalCompareItems}
              </div>
              <div className="text-xs">
                <p className="font-bold">{totalCompareItems} item{totalCompareItems > 1 ? 's' : ''} in Comparison Matrix</p>
                <p className="text-slate-400">Normalized per 100g comparison</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearComparison}
                className="px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors"
              >
                Clear
              </button>
              <Link
                to="/compare"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Open Matrix</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
