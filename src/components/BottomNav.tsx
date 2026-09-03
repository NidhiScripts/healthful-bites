import { Search, LayoutDashboard, Scale, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: Scale, label: 'Compare', path: '/compare' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (item: typeof navItems[0]) => {
    navigate(item.path);
  };

  const isActive = (item: typeof navItems[0]) => {
    return location.pathname === item.path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border safe-area-bottom md:hidden">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          
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
              <Icon className={cn("w-5 h-5", active && "animate-scale-in")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

