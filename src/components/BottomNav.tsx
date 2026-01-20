import { BarChart3, User, ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: BarChart3, label: 'Compare', path: '/comparison' },
  { icon: ShoppingCart, label: 'Cart', path: '/cart' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  const handleNavClick = (item: typeof navItems[0]) => {
    navigate(item.path);
  };

  const isActive = (item: typeof navItems[0]) => {
    return location.pathname === item.path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          const isCart = item.label === 'Cart';
          
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-xl transition-all duration-200 min-w-[60px] relative",
                active 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <div className="relative">
                <Icon className={cn("w-5 h-5", active && "animate-scale-in")} />
                {isCart && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
