import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDiet, UserBodyMetrics } from '@/context/DietContext';
import Navbar from '@/components/Navbar';
import {
  Search,
  Camera,
  Scale,
  Flame,
  Activity,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Leaf,
  Plus,
  Trash2,
  Sliders,
  ShieldAlert,
  HeartPulse,
  Dna,
  Droplets,
  Edit3,
  X,
  AlertCircle
} from 'lucide-react';
import { foodItems, FoodItem } from '@/data/foodData';
import { barcodeDatabase, BarcodeProduct } from '@/data/barcodeDatabase';
import BarcodeScanner from '@/components/BarcodeScanner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const allergyOptions = [
  { id: 'peanuts', label: 'Peanuts' },
  { id: 'dairy', label: 'Dairy / Lactose' },
  { id: 'gluten', label: 'Gluten / Wheat' },
  { id: 'soy', label: 'Soy' },
  { id: 'tree_nuts', label: 'Tree Nuts' },
  { id: 'eggs', label: 'Eggs' },
  { id: 'fish', label: 'Fish / Seafood' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    bodyMetrics,
    updateBodyMetrics,
    bmi,
    bmiCategory,
    bmiColor,
    bmr,
    tdee,
    dailyTargets,
    loggedItems,
    addFoodToLog,
    removeFoodFromLog,
    updateLoggedQuantity,
    clearTodayLog,
    consumed,
    remaining
  } = useDiet();

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false);
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
  const [foodSearchQuery, setFoodSearchQuery] = useState('');

  // Form state for editing body metrics
  const [metricsForm, setMetricsForm] = useState<UserBodyMetrics>(bodyMetrics);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleBarcodeScanned = (barcode: string) => {
    setIsScannerOpen(false);
    navigate(`/food/${barcode}`);
  };

  const handleSaveMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    updateBodyMetrics(metricsForm);
    setIsMetricsModalOpen(false);
  };

  const toggleAllergy = (allergyId: string) => {
    setMetricsForm((prev) => {
      const exists = prev.allergies.includes(allergyId);
      return {
        ...prev,
        allergies: exists
          ? prev.allergies.filter((a) => a !== allergyId)
          : [...prev.allergies, allergyId],
      };
    });
  };

  // Quick food search candidates for logging
  const quickFoodCandidates = useMemo(() => {
    const all = [...foodItems, ...barcodeDatabase.map(b => ({
      id: b.barcode,
      name: b.name,
      description: `${b.brand} • ${b.category}`,
      price: b.price,
      image: b.image || '',
      category: 'snacks' as const,
      nutrition: {
        calories: b.nutrition.calories,
        protein: b.nutrition.protein,
        carbohydrates: b.nutrition.carbohydrates,
        fat: b.nutrition.fat,
        fiber: b.nutrition.fiber,
        sugar: b.nutrition.sugar,
        sodium: b.nutrition.sodium,
      },
      healthScore: 80,
      healthStatus: 'safe' as const,
      badges: [b.brand],
      healthNote: ''
    }))];

    if (!foodSearchQuery.trim()) {
      return all.slice(0, 6);
    }

    return all.filter(f =>
      f.name.toLowerCase().includes(foodSearchQuery.toLowerCase()) ||
      (f.category && f.category.toLowerCase().includes(foodSearchQuery.toLowerCase()))
    ).slice(0, 8);
  }, [foodSearchQuery]);

  // Filter recommendations to respect user allergies
  const recommendedFoods = useMemo(() => {
    return foodItems.filter(item => {
      // Basic allergy filtering
      if (bodyMetrics.allergies.includes('dairy') && item.name.toLowerCase().includes('paneer')) return false;
      if (bodyMetrics.allergies.includes('peanuts') && item.name.toLowerCase().includes('peanut')) return false;
      return true;
    }).slice(0, 4);
  }, [bodyMetrics.allergies]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 pb-20 transition-colors">
      <Navbar />

      <main className="container mx-auto max-w-6xl px-4 py-8 space-y-8">
        
        {/* Welcome Greeting & Body Metrics Summary Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-700 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {getGreeting()} 👋
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800 capitalize">
                Goal: {bodyMetrics.goal === 'lose' ? 'Weight Loss' : bodyMetrics.goal === 'gain' ? 'Muscle Building' : 'Maintenance'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {user?.name || 'Health Enthusiast'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Your personalized nutrition plan calculated from your body metrics (BMI, BMR & Activity Level).
            </p>
          </div>

          {/* User Body Profile Stats Badges */}
          <div className="flex flex-wrap items-center gap-3">
            {/* BMI Badge */}
            <div className={`px-3.5 py-2 rounded-2xl border flex flex-col items-center justify-center ${bmiColor}`}>
              <span className="text-[10px] uppercase font-bold opacity-80">BMI</span>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-black">{bmi}</span>
                <span className="text-[10px] font-semibold">({bmiCategory})</span>
              </div>
            </div>

            {/* BMR / TDEE */}
            <div className="px-3.5 py-2 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">BMR / TDEE</span>
              <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                {bmr} / {tdee} <span className="text-[10px] font-normal text-slate-400">kcal</span>
              </span>
            </div>

            {/* Weight / Height */}
            <div className="px-3.5 py-2 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Body Stats</span>
              <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                {bodyMetrics.weight}kg • {bodyMetrics.height}cm
              </span>
            </div>

            {/* Edit Body Metrics Button */}
            <Dialog open={isMetricsModalOpen} onOpenChange={setIsMetricsModalOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  onClick={() => setMetricsForm(bodyMetrics)}
                  className="px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Customize Profile</span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-lg p-6 rounded-3xl">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl font-bold flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-emerald-600" />
                    Personalize Body Metrics & Daily Targets
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSaveMetrics} className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        min="30"
                        max="250"
                        value={metricsForm.weight}
                        onChange={(e) => setMetricsForm({ ...metricsForm, weight: Number(e.target.value) })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        min="100"
                        max="240"
                        value={metricsForm.height}
                        onChange={(e) => setMetricsForm({ ...metricsForm, height: Number(e.target.value) })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Age (years)
                      </label>
                      <input
                        type="number"
                        min="12"
                        max="120"
                        value={metricsForm.age}
                        onChange={(e) => setMetricsForm({ ...metricsForm, age: Number(e.target.value) })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Gender
                      </label>
                      <select
                        value={metricsForm.gender}
                        onChange={(e) => setMetricsForm({ ...metricsForm, gender: e.target.value as any })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Activity Level
                      </label>
                      <select
                        value={metricsForm.activityLevel}
                        onChange={(e) => setMetricsForm({ ...metricsForm, activityLevel: e.target.value as any })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold"
                      >
                        <option value="sedentary">Sedentary (Desk job)</option>
                        <option value="light">Lightly Active (1-2 workouts/wk)</option>
                        <option value="moderate">Moderate (3-5 workouts/wk)</option>
                        <option value="active">Very Active (6-7 workouts/wk)</option>
                        <option value="very_active">Athlete / Physical Job</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Primary Health Goal
                      </label>
                      <select
                        value={metricsForm.goal}
                        onChange={(e) => setMetricsForm({ ...metricsForm, goal: e.target.value as any })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold"
                      >
                        <option value="lose">Weight Loss (Caloric Deficit)</option>
                        <option value="maintain">Maintain Weight & Fitness</option>
                        <option value="gain">Build Muscle (Lean Bulk)</option>
                      </select>
                    </div>
                  </div>

                  {/* Allergy Selection */}
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      Food Allergens & Intolerances
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {allergyOptions.map((item) => {
                        const isSelected = metricsForm.allergies.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleAllergy(item.id)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                              isSelected
                                ? 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
                                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {isSelected ? '✓ ' : ''}{item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsMetricsModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-md"
                    >
                      Save & Recalculate
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Dynamic Remaining Nutrition Today Section */}
        <section className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Daily Nutrition & Remaining Intake
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Every logged meal automatically subtracts from your daily goal to show what you still need to consume today.
              </p>
            </div>

            <button
              onClick={() => setIsAddFoodModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Log Food Eaten</span>
            </button>
          </div>

          {/* 5 Dynamic Macro Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Calories Card */}
            <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-5 rounded-3xl border border-amber-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Calories</span>
                <Flame className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {remaining.calories} <span className="text-xs font-normal text-slate-400">kcal left</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {consumed.calories} / {dailyTargets.calories} kcal
                </p>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (consumed.calories / dailyTargets.calories) * 100)}%` }}
                />
              </div>
            </div>

            {/* Protein Card */}
            <div className="bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent p-5 rounded-3xl border border-cyan-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400">Protein</span>
                <Dna className="w-4 h-4 text-cyan-500" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {remaining.protein} <span className="text-xs font-normal text-slate-400">g left</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {consumed.protein}g / {dailyTargets.protein}g target
                </p>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (consumed.protein / dailyTargets.protein) * 100)}%` }}
                />
              </div>
            </div>

            {/* Carbohydrates Card */}
            <div className="bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent p-5 rounded-3xl border border-purple-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700 dark:text-purple-400">Carbs</span>
                <Sparkles className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {remaining.carbs} <span className="text-xs font-normal text-slate-400">g left</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {consumed.carbs}g / {dailyTargets.carbs}g target
                </p>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (consumed.carbs / dailyTargets.carbs) * 100)}%` }}
                />
              </div>
            </div>

            {/* Fats Card */}
            <div className="bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-transparent p-5 rounded-3xl border border-rose-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400">Total Fat</span>
                <Droplets className="w-4 h-4 text-rose-500" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {remaining.fat} <span className="text-xs font-normal text-slate-400">g left</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {consumed.fat}g / {dailyTargets.fat}g target
                </p>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (consumed.fat / dailyTargets.fat) * 100)}%` }}
                />
              </div>
            </div>

            {/* Fiber Card */}
            <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-5 rounded-3xl border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Dietary Fiber</span>
                <Leaf className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {remaining.fiber} <span className="text-xs font-normal text-slate-400">g left</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {consumed.fiber}g / {dailyTargets.fiber}g target
                </p>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (consumed.fiber / dailyTargets.fiber) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Today's Logged Meals List */}
        <section className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                <span>Today's Meal Log ({loggedItems.length} items)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Foods consumed today deducted from your daily targets.
              </p>
            </div>

            {loggedItems.length > 0 && (
              <button
                onClick={clearTodayLog}
                className="px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors"
              >
                Clear Log
              </button>
            )}
          </div>

          {loggedItems.length === 0 ? (
            <div className="py-10 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
              <Leaf className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No foods logged today yet</p>
              <p className="text-xs text-slate-400 mt-0.5 mb-3">Add items from the search bar, scanner, or quick log.</p>
              <button
                onClick={() => setIsAddFoodModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
              >
                + Log Your First Meal
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {loggedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 p-1 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <Leaf className="w-5 h-5 text-slate-300" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</h4>
                      <p className="text-xs text-slate-400">
                        {item.brand ? `${item.brand} • ` : ''}
                        <span className="capitalize font-semibold text-emerald-600">{item.mealType}</span> • {item.servingSize || '1 serving'}
                      </p>
                    </div>
                  </div>

                  {/* Macro details */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 text-xs">
                    <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-bold">
                      <span>{Math.round(item.calories * item.quantity)} kcal</span>
                      <span className="text-cyan-600">{Math.round(item.protein * item.quantity * 10) / 10}g P</span>
                      <span className="text-purple-600">{Math.round(item.carbs * item.quantity * 10) / 10}g C</span>
                      <span className="text-rose-600">{Math.round(item.fat * item.quantity * 10) / 10}g F</span>
                    </div>

                    {/* Quantity controls & delete */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateLoggedQuantity(item.id, item.quantity - 0.5)}
                        className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="font-bold text-xs min-w-[20px] text-center">{item.quantity}x</span>
                      <button
                        onClick={() => updateLoggedQuantity(item.id, item.quantity + 0.5)}
                        className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFoodFromLog(item.id)}
                        className="ml-2 text-slate-400 hover:text-rose-600 p-1"
                        title="Delete log"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quick Actions Grid */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/search"
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Search Food Items</h4>
                <p className="text-xs text-slate-400">Query 3M+ products & barcodes</p>
              </div>
            </Link>

            <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
              <DialogTrigger asChild>
                <button className="bg-white dark:bg-slate-800 text-left rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center shrink-0">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Scan Barcode</h4>
                    <p className="text-xs text-slate-400">Instant camera scanner</p>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <BarcodeScanner onDetected={handleBarcodeScanned} onClose={() => setIsScannerOpen(false)} />
              </DialogContent>
            </Dialog>

            <Link
              to="/compare"
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 flex items-center justify-center shrink-0">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Compare Matrix</h4>
                <p className="text-xs text-slate-400">Normalized 100g comparison</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Recommended Foods (Allergy-Filtered) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Recommended For Your Profile</span>
              </h3>
              <p className="text-xs text-slate-400">
                High nutrient density options matching your goal & allergy preferences.
              </p>
            </div>
            <Link to="/search" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedFoods.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="h-32 w-full bg-slate-50 dark:bg-slate-900 rounded-2xl p-2 mb-3 flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                    ) : (
                      <Leaf className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-slate-400">{item.nutrition.calories} kcal • {item.nutrition.protein}g protein</p>
                </div>

                <div className="flex gap-2 pt-3">
                  <Link
                    to={`/food/${item.id}`}
                    className="flex-1 py-2 text-center rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() =>
                      addFoodToLog({
                        id: item.id,
                        name: item.name,
                        calories: item.nutrition.calories,
                        protein: item.nutrition.protein,
                        carbs: item.nutrition.carbohydrates || 0,
                        fat: item.nutrition.fat,
                        fiber: item.nutrition.fiber,
                        image: item.image,
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal: Quick Food Logger */}
        <Dialog open={isAddFoodModalOpen} onOpenChange={setIsAddFoodModalOpen}>
          <DialogContent className="max-w-md p-6 rounded-3xl">
            <DialogHeader className="mb-3">
              <DialogTitle className="text-lg font-bold flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                Log a Meal / Food Item
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 text-xs">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search food to log (e.g. Dosa, Idli, Maggi, Poha)..."
                  value={foodSearchQuery}
                  onChange={(e) => setFoodSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2">
                {quickFoodCandidates.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  >
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{item.name}</p>
                      <p className="text-[11px] text-slate-400">
                        {item.nutrition.calories} kcal • {item.nutrition.protein}g protein
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        addFoodToLog({
                          id: item.id,
                          name: item.name,
                          calories: item.nutrition.calories,
                          protein: item.nutrition.protein,
                          carbs: item.nutrition.carbohydrates || 0,
                          fat: item.nutrition.fat,
                          fiber: item.nutrition.fiber,
                          image: item.image,
                        });
                        setIsAddFoodModalOpen(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Log
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

      </main>
    </div>
  );
};

export default Dashboard;
