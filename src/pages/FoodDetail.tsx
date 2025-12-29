import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShieldCheck, AlertTriangle, AlertCircle, Star, Leaf } from 'lucide-react';
import { foodItems, getHealthStatusLabel, formatPrice } from '@/data/foodData';
import { Button } from '@/components/ui/button';
import { NutritionChart, NutritionBarChart } from '@/components/NutritionChart';
import { HealthScoreGauge } from '@/components/HealthScoreGauge';
import { useCart } from '@/context/CartContext';
import { BottomNav } from '@/components/BottomNav';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const FoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, items, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);

  const item = foodItems.find(f => f.id === id);
  const cartItem = items.find(i => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Item not found</h2>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Go back
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
    toast({
      title: "Added to cart",
      description: `${quantity}x ${item.name} added to your cart.`,
    });
  };

  const getHealthIcon = () => {
    switch (item.healthStatus) {
      case 'safe': return <ShieldCheck className="w-5 h-5" />;
      case 'moderate': return <AlertTriangle className="w-5 h-5" />;
      case 'high-risk': return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getHealthAlertClass = () => {
    switch (item.healthStatus) {
      case 'safe': return 'bg-safe/10 text-safe border-safe/20';
      case 'moderate': return 'bg-moderate/10 text-moderate border-moderate/20';
      case 'high-risk': return 'bg-high-risk/10 text-high-risk border-high-risk/20';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 lg:h-96">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-medium"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Health Score Badge */}
        <div className="absolute top-4 right-4">
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-full font-bold shadow-medium",
            item.healthScore >= 7 ? "bg-safe text-primary-foreground" :
            item.healthScore >= 5 ? "bg-moderate text-foreground" :
            "bg-high-risk text-primary-foreground"
          )}>
            <Star className="w-4 h-4 fill-current" />
            {item.healthScore}/10
          </div>
        </div>
      </div>

      <main className="px-4 -mt-8 relative z-10 max-w-4xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Left Column */}
          <div>
            {/* Title Card */}
            <div className="bg-card rounded-2xl p-5 lg:p-6 shadow-medium border border-border mb-4 animate-slide-up">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-1">
                    {item.name}
                  </h1>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                <span className="text-2xl lg:text-3xl font-bold text-primary whitespace-nowrap">
                  {formatPrice(item.price)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.badges.map((badge) => (
                  <span
                    key={badge}
                    className="health-badge health-badge-safe"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Health Alert */}
            <div 
              className={cn(
                "rounded-2xl p-4 border mb-4 animate-slide-up",
                getHealthAlertClass()
              )}
              style={{ animationDelay: '100ms' }}
            >
              <div className="flex items-start gap-3">
                {getHealthIcon()}
                <div>
                  <h3 className="font-semibold mb-1">{getHealthStatusLabel(item.healthStatus)}</h3>
                  <p className="text-sm opacity-90">{item.healthNote}</p>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div 
              className="bg-card rounded-2xl p-5 border border-border mb-4 animate-slide-up"
              style={{ animationDelay: '120ms' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-foreground">Ingredients</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-muted text-muted-foreground border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>

            {/* Health Score Gauge */}
            <div 
              className="bg-card rounded-2xl p-5 border border-border mb-4 animate-slide-up"
              style={{ animationDelay: '150ms' }}
            >
              <h3 className="font-display font-bold text-foreground mb-4">Health Rating</h3>
              <div className="flex items-center justify-center">
                <HealthScoreGauge score={item.healthScore} size="lg" />
              </div>
            </div>

            {/* Nutrition Charts */}
            <div 
              className="space-y-4 animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              <NutritionChart {...item.nutrition} />
              <NutritionBarChart {...item.nutrition} />
            </div>
          </div>
        </div>

        {/* Add to Cart Section */}
        <div 
          className="mt-6 bg-card rounded-2xl p-5 border border-border animate-slide-up lg:max-w-md lg:mx-auto"
          style={{ animationDelay: '250ms' }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium text-foreground">Quantity</span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10 rounded-xl"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-xl font-bold w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-10 w-10 rounded-xl"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <Button
            variant="gradient"
            size="xl"
            className="w-full"
            onClick={handleAddToCart}
          >
            Add to Cart • {formatPrice(item.price * quantity)}
          </Button>
        </div>
      </main>

      {/* Bottom Nav - hidden on desktop */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default FoodDetail;
