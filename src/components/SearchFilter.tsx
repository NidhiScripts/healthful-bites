import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface FilterValues {
  search: string;
  calories: [number, number];
  sugar: [number, number];
  fat: [number, number];
  protein: [number, number];
  healthScore: [number, number];
}

interface SearchFilterProps {
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
}

export const SearchFilter = ({ filters, onFilterChange }: SearchFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, search: value });
  };

  const handleSliderChange = (key: keyof Omit<FilterValues, 'search'>, value: number[]) => {
    onFilterChange({ ...filters, [key]: value as [number, number] });
  };

  const resetFilters = () => {
    onFilterChange({
      search: '',
      calories: [0, 800],
      sugar: [0, 50],
      fat: [0, 50],
      protein: [0, 40],
      healthScore: [0, 10]
    });
  };

  const hasActiveFilters = 
    filters.calories[0] > 0 || filters.calories[1] < 800 ||
    filters.sugar[0] > 0 || filters.sugar[1] < 50 ||
    filters.fat[0] > 0 || filters.fat[1] < 50 ||
    filters.protein[0] > 0 || filters.protein[1] < 40 ||
    filters.healthScore[0] > 0 || filters.healthScore[1] < 10;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search food items..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-12 rounded-xl bg-card border-border focus:border-primary"
          />
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "h-12 w-12 rounded-xl relative",
            hasActiveFilters && "ring-2 ring-primary ring-offset-2"
          )}
        >
          <SlidersHorizontal className="w-5 h-5" />
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full" />
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="bg-card rounded-2xl p-5 border border-border shadow-medium animate-slide-up space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-foreground">Filters</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground">
                <X className="w-4 h-4 mr-1" />
                Reset
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <FilterSlider
              label="Calories"
              value={filters.calories}
              onChange={(v) => handleSliderChange('calories', v)}
              max={800}
              unit="kcal"
            />
            <FilterSlider
              label="Sugar"
              value={filters.sugar}
              onChange={(v) => handleSliderChange('sugar', v)}
              max={50}
              unit="g"
            />
            <FilterSlider
              label="Fat"
              value={filters.fat}
              onChange={(v) => handleSliderChange('fat', v)}
              max={50}
              unit="g"
            />
            <FilterSlider
              label="Protein"
              value={filters.protein}
              onChange={(v) => handleSliderChange('protein', v)}
              max={40}
              unit="g"
            />
            <FilterSlider
              label="Health Score"
              value={filters.healthScore}
              onChange={(v) => handleSliderChange('healthScore', v)}
              max={10}
              unit=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface FilterSliderProps {
  label: string;
  value: [number, number];
  onChange: (value: number[]) => void;
  max: number;
  unit: string;
}

const FilterSlider = ({ label, value, onChange, max, unit }: FilterSliderProps) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <span className="font-medium text-foreground">{label}</span>
      <span className="text-muted-foreground">
        {value[0]}{unit} - {value[1]}{unit}
      </span>
    </div>
    <Slider
      value={value}
      onValueChange={onChange}
      max={max}
      step={1}
      className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
    />
  </div>
);
