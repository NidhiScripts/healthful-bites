import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FoodItem } from '@/data/foodData';
import { Comparison } from '@/components/Comparison';
import { findSimilarItems } from '@/utils/comparison';
import { Button } from '@/components/ui/button';
import { ArrowLeft, GitCompare, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Compare = () => {
  const navigate = useNavigate();
  const [comparisonItems, setComparisonItems] = useState<FoodItem[]>([]);
  const [similarItems, setSimilarItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('comparison_items');
    if (stored) {
      const items = JSON.parse(stored);
      setComparisonItems(items);
      
      // Find similar items if we have at least one item
      if (items.length > 0) {
        const allItems = JSON.parse(localStorage.getItem('all_food_items') || '[]');
        const similar = findSimilarItems(items[0], allItems, 6);
        setSimilarItems(similar.map(s => s.item));
      }
    }
  }, []);

  const handleClearComparison = () => {
    localStorage.removeItem('comparison_items');
    setComparisonItems([]);
    toast({
      title: "Comparison cleared",
      description: "All items have been removed from comparison.",
    });
  };

  const handleAddSimilar = (item: FoodItem) => {
    if (comparisonItems.length >= 4) {
      toast({
        title: "Comparison limit reached",
        description: "You can compare up to 4 items at a time.",
        variant: "destructive"
      });
      return;
    }

    if (comparisonItems.some(i => i.id === item.id)) {
      toast({
        title: "Already added",
        description: `${item.name} is already in comparison.`,
      });
      return;
    }

    const updated = [...comparisonItems, item];
    setComparisonItems(updated);
    localStorage.setItem('comparison_items', JSON.stringify(updated));
    
    toast({
      title: "Added to comparison",
      description: `${item.name} added to comparison.`,
    });
  };

  if (comparisonItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <GitCompare className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              No items to compare
            </h2>
            <p className="text-muted-foreground mb-8">
              Select items from the menu using the compare button to build your comparison list.
            </p>
            <Button
              variant="gradient"
              size="lg"
              onClick={() => navigate('/dashboard')}
            >
              Browse Menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (comparisonItems.length === 1) {
    return (
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="px-4 py-4 max-w-7xl mx-auto flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-display font-bold text-foreground">Build Comparison</h1>
              <p className="text-muted-foreground text-sm">Select more items to compare (1/4)</p>
            </div>
            <Button
              variant="outline"
              onClick={handleClearComparison}
              className="ml-auto"
            >
              Clear All
            </Button>
          </div>
        </header>

        <main className="px-4 py-6 max-w-7xl mx-auto">
          {/* Current Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Currently Selected</h3>
            <div className="bg-card rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-4">
                <img
                  src={comparisonItems[0].image}
                  alt={comparisonItems[0].name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{comparisonItems[0].name}</h4>
                  <p className="text-sm text-muted-foreground">{comparisonItems[0].brand}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/food/${comparisonItems[0].id}`)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>

          {/* Similar Items Suggestions */}
          {similarItems.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Similar Items to Compare</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {similarItems.map((item) => (
                  <div key={item.id} className="bg-card rounded-2xl p-4 border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground line-clamp-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">₹{item.price}</span>
                      <Button
                        variant="gradient"
                        size="sm"
                        onClick={() => handleAddSimilar(item)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Browse More */}
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/dashboard')}
            >
              Browse More Items
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return <Comparison items={comparisonItems} onClose={() => navigate('/dashboard')} />;
};

export default Compare;
