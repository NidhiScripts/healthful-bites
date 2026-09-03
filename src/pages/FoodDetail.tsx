import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Scale, AlertTriangle, ShieldCheck, CheckCircle2, Leaf, Info, Flame } from 'lucide-react';
import { productService, UnifiedProduct } from '@/api/productService';
import { evaluateHealthWarnings, DEFAULT_USER_PREFERENCES, HealthWarning } from '@/utils/healthSafety';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useComparison } from '@/context/ComparisonContext';
import { useDiet } from '@/context/DietContext';
import { toast } from 'sonner';

const FoodDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToComparison, isInComparison } = useComparison();
  const { addFoodToLog } = useDiet();

  const [product, setProduct] = useState<UnifiedProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [warnings, setWarnings] = useState<HealthWarning[]>([]);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    setIsLoading(true);
    productService.getProductById(id).then((result) => {
      if (isMounted) {
        setProduct(result);
        if (result) {
          const evaluated = evaluateHealthWarnings(result, DEFAULT_USER_PREFERENCES);
          setWarnings(evaluated);
        }
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToDiet = () => {
    if (!isAuthenticated) {
      toast.info('Sign in to save products to your daily diet tracker.');
      navigate('/auth');
      return;
    }

    if (product) {
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
    }
  };

  const handleCompare = () => {
    if (product) {
      addToComparison(product);
      navigate('/compare');
    }
  };

  const getNutriscoreColor = (grade?: string) => {
    switch (grade?.toLowerCase()) {
      case 'a': return 'bg-emerald-600 text-white';
      case 'b': return 'bg-lime-500 text-white';
      case 'c': return 'bg-yellow-500 text-white';
      case 'd': return 'bg-amber-500 text-white';
      case 'e': return 'bg-red-600 text-white';
      default: return 'bg-slate-200 text-slate-700';
    }
  };

  const getNovaColor = (group?: number) => {
    switch (group) {
      case 1: return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 2: return 'bg-lime-100 text-lime-800 border-lime-300';
      case 3: return 'bg-amber-100 text-amber-800 border-amber-300';
      case 4: return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-16">
      <Navbar />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {isLoading ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-300">Fetching nutritional data...</p>
          </div>
        ) : !product ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center shadow-sm">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Product Not Found</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              We couldn't find details for product code <span className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{id}</span>.
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-all shadow-sm"
            >
              Search Other Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Product Overview Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                
                {/* Product Image & Badges */}
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-slate-50 dark:bg-slate-700/50 p-4 border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden shadow-inner">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                    ) : (
                      <div className="text-center text-slate-400">
                        <Leaf className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <span className="text-xs">No image available</span>
                      </div>
                    )}
                  </div>

                  {/* Nutri-Score & NOVA Badges */}
                  <div className="flex items-center gap-3 mt-4">
                    {product.nutriscoreGrade && (
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Nutri-Score</span>
                        <span className={`px-3 py-1 rounded-lg text-sm font-black uppercase tracking-wider ${getNutriscoreColor(product.nutriscoreGrade)} shadow-sm`}>
                          Grade {product.nutriscoreGrade}
                        </span>
                      </div>
                    )}

                    {product.novaGroup && (
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">NOVA Group</span>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getNovaColor(product.novaGroup)}`}>
                          Group {product.novaGroup}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Details & Actions */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        {product.brand}
                      </span>
                      {product.category && (
                        <span className="text-xs text-slate-500 dark:text-slate-400">• {product.category}</span>
                      )}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                      {product.name}
                    </h1>
                    {product.servingSize && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Serving size: {product.servingSize}
                      </p>
                    )}
                  </div>

                  {/* NutriDSA Health Score Gauge */}
                  <div className="flex items-start sm:items-center gap-4 py-4 border-y border-slate-100 dark:border-slate-700">
                    <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black text-white shrink-0 shadow-md ${
                      (product.nutriDsaScore || product.healthScore) >= 85 ? 'bg-emerald-600 shadow-emerald-600/20' :
                      (product.nutriDsaScore || product.healthScore) >= 70 ? 'bg-teal-600 shadow-teal-600/20' :
                      (product.nutriDsaScore || product.healthScore) >= 55 ? 'bg-amber-500 shadow-amber-500/20' :
                      (product.nutriDsaScore || product.healthScore) >= 40 ? 'bg-orange-500 shadow-orange-500/20' : 'bg-rose-600 shadow-rose-600/20'
                    }`}>
                      <span className="text-xl leading-none">{product.nutriDsaScore || product.healthScore}</span>
                      <span className="text-[9px] uppercase font-bold opacity-80 mt-0.5">/100</span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                        <span>Health Score:</span>
                        <span className="text-emerald-600 dark:text-emerald-400">
                          {product.nutriDsaLabel || ((product.nutriDsaScore || product.healthScore) >= 70 ? 'Good' : 'Moderate')}
                        </span>
                        {product.nutriDsaConfidence !== undefined && (
                          <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            Confidence: {product.nutriDsaConfidence}%
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Based on nutrient density, sugar, sodium, fat, protein, fiber and processing level (normalized per 100g).
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={handleAddToDiet}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-600/20 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Add to Diet Log
                    </button>

                    <button
                      onClick={handleCompare}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold transition-all"
                    >
                      <Scale className="w-4 h-4" />
                      Compare Item
                    </button>
                  </div>

                </div>

              </div>
            </div>

            {/* Health Preference Warning Banners */}
            {warnings.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>Dietary Preference & Attribute Alerts</span>
                </div>
                <div className="space-y-2">
                  {warnings.map((warning) => (
                    <div key={warning.id} className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-3 text-sm flex items-start gap-3 border border-amber-100 dark:border-amber-900/50">
                      <span className="font-semibold text-amber-800 dark:text-amber-400 min-w-max">
                        {warning.title}
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                        {warning.message}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-amber-700/80 dark:text-amber-400/70 italic pt-1">
                  Note: Warnings reflect nutritional thresholds and saved dietary preference matches, not medical diagnoses.
                </p>
              </div>
            )}

            {/* Nutrition Facts Table (per 100g) */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5 text-emerald-600" />
                <span>Nutrition Facts (per 100g / 100ml)</span>
              </h2>

              {product.nutrition ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  
                  <div className="bg-slate-50 dark:bg-slate-700/40 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Energy / Calories</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      {product.nutrition.calories !== undefined ? `${product.nutrition.calories} kcal` : 'Unavailable'}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/40 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Protein</span>
                    <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                      {product.nutrition.protein !== undefined ? `${product.nutrition.protein} g` : 'Unavailable'}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/40 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Carbohydrates</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      {product.nutrition.carbohydrates !== undefined ? `${product.nutrition.carbohydrates} g` : 'Unavailable'}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/40 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Sugars</span>
                    <span className={`text-xl font-black ${
                      (product.nutrition.sugar || 0) > 10 ? 'text-amber-600' : 'text-slate-900 dark:text-white'
                    }`}>
                      {product.nutrition.sugar !== undefined ? `${product.nutrition.sugar} g` : 'Unavailable'}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/40 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Total Fat</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      {product.nutrition.fat !== undefined ? `${product.nutrition.fat} g` : 'Unavailable'}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/40 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Dietary Fiber</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      {product.nutrition.fiber !== undefined ? `${product.nutrition.fiber} g` : 'Unavailable'}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/40 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Sodium</span>
                    <span className={`text-xl font-black ${
                      (product.nutrition.sodium || 0) > 500 ? 'text-amber-600' : 'text-slate-900 dark:text-white'
                    }`}>
                      {product.nutrition.sodium !== undefined ? `${product.nutrition.sodium} mg` : 'Unavailable'}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/40 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Saturated Fat</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      {product.nutrition.saturatedFat !== undefined ? `${product.nutrition.saturatedFat} g` : 'Unavailable'}
                    </span>
                  </div>

                </div>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-6 text-center text-slate-500 text-sm">
                  Nutrition information unavailable for this product.
                </div>
              )}
            </div>

            {/* Ingredients List */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Ingredients</span>
              </h2>

              {product.ingredients && product.ingredients.length > 0 ? (
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {product.ingredients.join(', ')}.
                </p>
              ) : (
                <p className="text-sm text-slate-500 italic">
                  Ingredients information unavailable for this product.
                </p>
              )}
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default FoodDetail;
