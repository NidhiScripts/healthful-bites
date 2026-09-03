import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Package, TrendingUp, Flame, ShieldAlert, Check, UserCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { DEFAULT_USER_PREFERENCES, UserHealthPreferences } from '@/utils/healthSafety';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [preferences, setPreferences] = useState<UserHealthPreferences>(() => {
    const saved = localStorage.getItem('user_health_prefs');
    return saved ? JSON.parse(saved) : DEFAULT_USER_PREFERENCES;
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const togglePref = (category: keyof UserHealthPreferences, key: string) => {
    const updated = {
      ...preferences,
      [category]: {
        ...(preferences[category] as any),
        [key]: !(preferences[category] as any)[key]
      }
    };
    setPreferences(updated);
    localStorage.setItem('user_health_prefs', JSON.stringify(updated));
    toast.success('Health preferences updated!');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-16">
      <Navbar />

      <main className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
        
        {/* User Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {user?.name || 'Health Enthusiast'}
              </h1>
              <p className="text-sm text-slate-500">{user?.email || 'user@example.com'}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Active Health Profile
                </span>
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>

        {/* Dietary & Health Preference Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-600" />
              <span>Dietary & Nutrition Preferences</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Selecting your preferences automatically triggers non-medical warnings when scanning or comparing food products.
            </p>
          </div>

          {/* Dietary Restrictions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Dietary Choices</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { key: 'vegetarian', label: 'Vegetarian' },
                { key: 'vegan', label: 'Vegan' },
                { key: 'glutenFree', label: 'Gluten Free' },
                { key: 'lactoseFree', label: 'Lactose Free' },
              ].map((item) => {
                const active = preferences.dietary[item.key as keyof UserHealthPreferences['dietary']];
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => togglePref('dietary', item.key)}
                    className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      active
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nutrition Preferences */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Nutrition Targets</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { key: 'lowSugar', label: 'Low Sugar (<10g)' },
                { key: 'lowSodium', label: 'Low Sodium (<500mg)' },
                { key: 'highProtein', label: 'High Protein' },
                { key: 'lowFat', label: 'Low Fat' },
              ].map((item) => {
                const active = preferences.nutrition[item.key as keyof UserHealthPreferences['nutrition']];
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => togglePref('nutrition', item.key)}
                    className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      active
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Allergen Filters */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Allergen Safety Flags</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { key: 'peanuts', label: 'Peanuts' },
                { key: 'treeNuts', label: 'Tree Nuts' },
                { key: 'milk', label: 'Milk / Dairy' },
                { key: 'eggs', label: 'Eggs' },
                { key: 'soy', label: 'Soy' },
                { key: 'gluten', label: 'Gluten / Wheat' },
              ].map((item) => {
                const active = preferences.allergens[item.key as keyof UserHealthPreferences['allergens']];
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => togglePref('allergens', item.key)}
                    className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      active
                        ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <Check className="w-4 h-4 text-amber-600" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default Profile;
