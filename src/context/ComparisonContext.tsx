import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UnifiedProduct } from '@/api/productService';
import { toast } from 'sonner';

interface ComparisonContextType {
  comparisonItems: UnifiedProduct[];
  addToComparison: (product: UnifiedProduct) => boolean;
  removeFromComparison: (id: string) => void;
  toggleComparison: (product: UnifiedProduct) => void;
  isInComparison: (id: string) => boolean;
  clearComparison: () => void;
  totalItems: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const STORAGE_KEY = 'healthfood_comparison_matrix_items';

export const ComparisonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [comparisonItems, setComparisonItems] = useState<UnifiedProduct[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comparisonItems));
    } catch (e) {
      console.error('Failed to save comparison items to localStorage', e);
    }
  }, [comparisonItems]);

  const isInComparison = (id: string) => {
    return comparisonItems.some((item) => item.id === id || (item.barcode && item.barcode === id));
  };

  const addToComparison = (product: UnifiedProduct): boolean => {
    if (isInComparison(product.id)) {
      toast.info(`"${product.name}" is already in your comparison matrix.`);
      return false;
    }

    if (comparisonItems.length >= 4) {
      toast.error('Comparison limit reached (max 4 products). Remove an item first.');
      return false;
    }

    setComparisonItems((prev) => [...prev, product]);
    toast.success(`Added "${product.name}" to Comparison Matrix!`);
    return true;
  };

  const removeFromComparison = (id: string) => {
    setComparisonItems((prev) => {
      const removed = prev.find((i) => i.id === id || i.barcode === id);
      const filtered = prev.filter((item) => item.id !== id && item.barcode !== id);
      if (removed) {
        toast.info(`Removed "${removed.name}" from comparison.`);
      }
      return filtered;
    });
  };

  const toggleComparison = (product: UnifiedProduct) => {
    if (isInComparison(product.id)) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  const clearComparison = () => {
    setComparisonItems([]);
    toast.info('Comparison matrix cleared.');
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparisonItems,
        addToComparison,
        removeFromComparison,
        toggleComparison,
        isInComparison,
        clearComparison,
        totalItems: comparisonItems.length,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within ComparisonProvider');
  }
  return context;
};
