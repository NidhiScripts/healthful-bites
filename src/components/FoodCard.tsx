import { Plus, Star } from 'lucide-react';
import { FoodItem, formatPrice } from '@/data/foodData';
import { Button } from '@/components/ui/button';
import { useDiet } from '@/context/DietContext';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface FoodCardProps {
  item: FoodItem;
  index: number;
}

export const FoodCard = ({ item, index }: FoodCardProps) => {
  const { addFoodToLog } = useDiet();
  const navigate = useNavigate();

  const handleLogFood = (e: React.MouseEvent) => {
    e.stopPropagation();
    addFoodToLog({
      id: item.id,
      name: item.name,
      image: item.image,
      servingSize: item.servingSize,
      calories: item.nutrition.calories,
      protein: item.nutrition.protein,
      carbs: item.nutrition.carbohydrates || 0,
      fat: item.nutrition.fat,
      fiber: item.nutrition.fiber,
      sodium: item.nutrition.sodium,
    });
  };

  const getHealthBadgeClass = (status: string) => {
    switch (status) {
      case 'safe': return 'health-badge-safe';
      case 'moderate': return 'health-badge-moderate';
      case 'high-risk': return 'health-badge-risk';
      default: return 'health-badge-safe';
    }
  };

  return (
    <article
      onClick={() => navigate(`/food/${item.id}`)}
      className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 cursor-pointer animate-slide-up border border-border/50 hover:border-primary/30 hover:scale-[1.02]"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {item.badges.slice(0, 2).map((badge) => (
            <span
              key={badge}
              className="bg-card/90 backdrop-blur-sm text-foreground text-[10px] font-semibold px-2 py-1 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
        <div className="absolute top-3 right-3">
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold",
            item.healthScore >= 7 ? "bg-safe text-primary-foreground" :
            item.healthScore >= 5 ? "bg-moderate text-foreground" :
            "bg-high-risk text-primary-foreground"
          )}>
            <Star className="w-3 h-3 fill-current" />
            {item.healthScore}/10
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors text-base lg:text-lg">
            {item.name}
          </h3>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3 lg:mb-4">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg lg:text-xl font-bold text-foreground">{formatPrice(item.price)}</span>
            <span className={cn("health-badge text-[10px]", getHealthBadgeClass(item.healthStatus))}>
              {item.healthStatus === 'safe' ? 'Safe' : 
               item.healthStatus === 'moderate' ? 'Moderate' : 'High Risk'}
            </span>
          </div>
          <Button
            variant="gradient"
            size="icon"
            onClick={handleLogFood}
            className="rounded-xl h-10 w-10"
            title="Log Food"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </article>
  );
};
