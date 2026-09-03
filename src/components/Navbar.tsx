import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Camera, Scale, User, LayoutDashboard, LogIn, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useComparison } from '@/context/ComparisonContext';
import BarcodeScanner from './BarcodeScanner';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems: totalCompareItems } = useComparison();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleBarcodeScanned = (barcode: string) => {
    setIsScannerOpen(false);
    navigate(`/food/${barcode}`);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo */}
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 font-bold text-xl text-emerald-600 hover:text-emerald-700 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 p-1 flex items-center justify-center shadow-md border border-emerald-100 dark:border-slate-700">
            <img src="/logo.svg" alt="HealthfulBites Logo" className="w-full h-full object-contain" />
          </div>
          <span className="tracking-tight">Healthful<span className="text-emerald-800 dark:text-emerald-400">Bites</span></span>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-6 relative">
          <input
            type="text"
            placeholder="Search 3M+ food products, brands, or barcodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 pl-10 pr-10 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all border border-transparent hover:border-slate-300"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          
          <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="absolute right-2 top-1.5 p-1 rounded-full text-emerald-600 hover:bg-emerald-50 transition-colors"
                title="Scan Product Barcode"
              >
                <Camera className="w-4 h-4" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <BarcodeScanner onDetected={handleBarcodeScanned} onClose={() => setIsScannerOpen(false)} />
            </DialogContent>
          </Dialog>
        </form>

        {/* Nav Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          
          {/* Quick Scanner Button on Mobile */}
          <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="md:hidden p-2 rounded-lg text-emerald-600 hover:bg-emerald-50"
                title="Scan Barcode"
              >
                <Camera className="w-5 h-5" />
              </button>
            </DialogTrigger>
          </Dialog>

          {/* Search Page Link */}
          <Link
            to="/search"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/search') ? 'bg-emerald-50 text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
            }`}
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
          </Link>

          {/* Compare Link */}
          <Link
            to="/compare"
            className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/compare') ? 'bg-emerald-50 text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span className="hidden sm:inline">Compare</span>
            {totalCompareItems > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                {totalCompareItems}
              </span>
            )}
          </Link>

          {/* Authenticated Links */}
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/dashboard') ? 'bg-emerald-50 text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              <Link
                to="/profile"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/profile') ? 'bg-emerald-50 text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            </>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Navbar;
