import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { foodItems, FoodItem } from '@/data/foodData';
import { FoodCard } from '@/components/FoodCard';
import { SearchFilter } from '@/components/SearchFilter';
import { BottomNav } from '@/components/BottomNav';
import { Cookie, Sunrise, UtensilsCrossed, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterValues {
  search: string;
  calories: [number, number];
  sugar: [number, number];
  fat: [number, number];
  protein: [number, number];
  healthScore: [number, number];
}

const categories = [
  { id: 'all', label: 'All', icon: TrendingUp },
  { id: 'snacks', label: 'Snacks', icon: Cookie },
  { id: 'breakfast', label: 'Breakfast', icon: Sunrise },
  { id: 'lunch', label: 'Lunch', icon: UtensilsCrossed },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'all';
  
  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    calories: [0, 800],
    sugar: [0, 50],
    fat: [0, 50],
    protein: [0, 40],
    healthScore: [0, 10]
  });

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);

  useEffect(() => {
    setActiveCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const filteredItems = useMemo(() => {
    return foodItems
      .filter((item: FoodItem) => {
        if (activeCategory !== 'all' && item.category !== activeCategory) return false;
        if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (item.nutrition.calories < filters.calories[0] || item.nutrition.calories > filters.calories[1]) return false;
        if (item.nutrition.sugar < filters.sugar[0] || item.nutrition.sugar > filters.sugar[1]) return false;
        if (item.nutrition.fat < filters.fat[0] || item.nutrition.fat > filters.fat[1]) return false;
        if (item.nutrition.protein < filters.protein[0] || item.nutrition.protein > filters.protein[1]) return false;
        if (item.healthScore < filters.healthScore[0] || item.healthScore > filters.healthScore[1]) return false;
        return true;
      })
      .sort((a, b) => b.healthScore - a.healthScore);
  }, [filters, activeCategory]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="px-4 py-4 max-w-lg mx-auto">
          <div className="mb-4">
            <p className="text-muted-foreground text-sm">{getGreeting()}</p>
            <h1 className="text-2xl font-display font-bold text-foreground">
              {user?.name?.split(' ')[0]} 👋
            </h1>
          </div>
          <SearchFilter filters={filters} onFilterChange={setFilters} />
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-medium"
                    : "bg-card text-muted-foreground hover:bg-muted border border-border"
                )}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-muted-foreground text-sm">
            <span className="font-semibold text-foreground">{filteredItems.length}</span> items found
          </p>
          <p className="text-xs text-muted-foreground">Sorted by health score</p>
        </div>

        {/* Food Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item, index) => (
              <FoodCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Cookie className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-display font-bold text-foreground mb-2">No items found</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Try adjusting your filters or search for something different.
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
