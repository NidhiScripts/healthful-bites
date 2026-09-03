import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Trophy, AlertTriangle, CheckCircle, XCircle, Plus } from 'lucide-react';
import { FoodItem, formatPrice, getHealthStatusLabel } from '@/data/foodData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useDiet } from '@/context/DietContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ComparisonProps {
  items: FoodItem[];
  onClose?: () => void;
}

export const Comparison = ({ items, onClose }: ComparisonProps) => {
  const navigate = useNavigate();
  const { addFoodToLog } = useDiet();
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null);

  if (items.length < 2) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Need at least 2 items to compare</h2>
          <Button onClick={() => navigate('/dashboard')}>
            Browse Menu
          </Button>
        </div>
      </div>
    );
  }

  const getWinner = () => {
    return items.reduce((best, current) => 
      current.healthScore > best.healthScore ? current : best
    );
  };

  const winner = getWinner();

  const getComparisonMetric = (metric: keyof FoodItem['nutrition'], item: FoodItem) => {
    const value = item.nutrition[metric];
    const isWinner = items.every(other => other.nutrition[metric] >= value);
    const isLoser = items.every(other => other.nutrition[metric] <= value);
    
    return { value, isWinner, isLoser };
  };

  const handleLogItem = (item: FoodItem) => {
    addFoodToLog({
      id: item.id,
      name: item.name,
      image: item.image,
      calories: item.nutrition.calories,
      protein: item.nutrition.protein,
      carbs: item.nutrition.carbohydrates || 0,
      fat: item.nutrition.fat,
      fiber: item.nutrition.fiber,
      sodium: item.nutrition.sodium,
    });
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-4 h-4 text-safe" />;
      case 'moderate': return <AlertTriangle className="w-4 h-4 text-moderate" />;
      case 'high-risk': return <XCircle className="w-4 h-4 text-high-risk" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="px-4 py-4 max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={onClose || (() => navigate(-1))}
            className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl lg:text-2xl font-display font-bold text-foreground">Item Comparison</h1>
            <p className="text-muted-foreground text-sm">Comparing {items.length} items</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-7xl mx-auto">
        {/* Winner Announcement */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 p-6 mb-6">
          <div className="flex items-center gap-4">
            <Trophy className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-lg font-bold text-foreground">Healthier Choice</h2>
              <p className="text-muted-foreground">
                <span className="font-semibold text-primary">{winner.name}</span> by {winner.brand} 
                {' '}wins with a health score of {winner.healthScore}/10
              </p>
            </div>
          </div>
        </Card>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {items.map((item, index) => {
            const isWinnerItem = item.id === winner.id;
            
            return (
              <Card 
                key={item.id}
                className={cn(
                  "relative overflow-hidden transition-all duration-300 hover:shadow-medium",
                  isWinnerItem && "ring-2 ring-primary ring-offset-2"
                )}
              >
                {isWinnerItem && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-primary text-primary-foreground">
                      <Trophy className="w-3 h-3 mr-1" />
                      Winner
                    </Badge>
                  </div>
                )}

                <div className="p-5">
                  {/* Item Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-primary font-bold">{formatPrice(item.price)}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current text-primary" />
                          <span className="text-xs font-medium">{item.healthScore}/10</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Health Status */}
                  <div className="flex items-center gap-2 mb-4">
                    {getHealthIcon(item.healthStatus)}
                    <span className="text-sm font-medium">{getHealthStatusLabel(item.healthStatus)}</span>
                  </div>

                  {/* Nutrition Comparison */}
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Nutrition Facts</h4>
                    {(['calories', 'protein', 'fat', 'sugar'] as const).map((metric) => {
                      const comparison = getComparisonMetric(metric, item);
                      return (
                        <div key={metric} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground capitalize">{metric}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {comparison.value}
                              {metric === 'calories' ? '' : 'g'}
                            </span>
                            {comparison.isWinner && (
                              <CheckCircle className="w-3 h-3 text-safe" />
                            )}
                            {comparison.isLoser && metric !== 'protein' && (
                              <XCircle className="w-3 h-3 text-high-risk" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.badges.slice(0, 3).map((badge) => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/food/${item.id}`)}
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="gradient"
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      className="flex-1"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detailed Comparison Table */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Detailed Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Metric</th>
                  {items.map((item) => (
                    <th key={item.id} className="text-center py-3 px-4 font-medium text-foreground">
                      {item.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-muted-foreground">Brand</td>
                  {items.map((item) => (
                    <td key={item.id} className="text-center py-3 px-4">{item.brand}</td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-muted-foreground">Price</td>
                  {items.map((item) => (
                    <td key={item.id} className="text-center py-3 px-4 font-medium">
                      {formatPrice(item.price)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-muted-foreground">Health Score</td>
                  {items.map((item) => (
                    <td key={item.id} className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-3 h-3 fill-current text-primary" />
                        <span className="font-medium">{item.healthScore}/10</span>
                      </div>
                    </td>
                  ))}
                </tr>
                {(['calories', 'protein', 'fat', 'sugar'] as const).map((metric) => (
                  <tr key={metric} className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground capitalize">{metric}</td>
                    {items.map((item) => {
                      const comparison = getComparisonMetric(metric, item);
                      return (
                        <td key={item.id} className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <span className="font-medium">
                              {item.nutrition[metric]}
                              {metric === 'calories' ? '' : 'g'}
                            </span>
                            {comparison.isWinner && (
                              <CheckCircle className="w-3 h-3 text-safe" />
                            )}
                            {comparison.isLoser && metric !== 'protein' && (
                              <XCircle className="w-3 h-3 text-high-risk" />
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};
