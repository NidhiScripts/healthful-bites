import React, { useState, useMemo, useRef, useEffect } from 'react';
import { searchProducts, BarcodeProduct } from '../data/barcodeDatabase';

interface ProductSearchProps {
  onProductSelect: (product: BarcodeProduct) => void;
  onAddToComparison?: (product: BarcodeProduct) => void;
  placeholder?: string;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ 
  onProductSelect, 
  onAddToComparison,
  placeholder = "Search for products..." 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchProducts(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % searchResults.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + searchResults.length) % searchResults.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handleProductClick(searchResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleProductClick = (product: BarcodeProduct) => {
    setSearchQuery(product.name);
    setIsOpen(false);
    onProductSelect(product);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full h-14 rounded-2xl border-2 border-slate-200 bg-white px-12 text-xl text-slate-900 shadow-lg outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
        />
        
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl border-2 border-slate-200 shadow-2xl max-h-96 overflow-y-auto">
          {searchResults.map((product, index) => (
            <div
              key={product.barcode}
              onClick={() => handleProductClick(product)}
              className={`flex items-center gap-4 p-4 cursor-pointer transition-colors border-b border-slate-100 last:border-b-0 ${
                index === selectedIndex 
                  ? 'bg-violet-50 border-l-4 border-l-violet-500' 
                  : 'hover:bg-slate-50'
              }`}
            >
              {/* Product Image */}
              <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={product.image || 'https://images.unsplash.com/photo-1546069901-b9f581a1996d?w=300&h=200&fit=crop'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-b9f581a1996d?w=300&h=200&fit=crop';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="text-lg font-bold text-slate-900 truncate">{product.name}</div>
                <div className="text-base text-slate-600">{product.brand}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-slate-500">{product.category}</span>
                  <span className="text-lg font-bold text-emerald-600">₹{product.price}</span>
                </div>
              </div>

              {/* Barcode */}
              <div className="flex-shrink-0 text-xs text-slate-400 font-mono">
                {product.barcode}
              </div>
              {onAddToComparison && (
                <button
                  onClick={() => onAddToComparison(product)}
                  className="absolute top-2 right-2 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors"
                  title="Add to Comparison"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H8a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-8a2 2 0 00-2-2h-4m-4 4v4m0 0 4-4h4m4 0v-4m0-4h-4" />
                  </svg>
                </button>
              )}
            </div>
          ))}

          {/* Show More Results */}
          {searchResults.length >= 10 && (
            <div className="p-4 text-center text-sm text-slate-500 border-t border-slate-100">
              Showing first 10 results. Refine your search for more specific results.
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {isOpen && searchQuery && searchResults.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl border-2 border-slate-200 shadow-2xl p-6 text-center">
          <div className="text-slate-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="text-lg font-semibold text-slate-700">No products found</div>
          <div className="text-base text-slate-500 mt-1">
            Try searching with different keywords like "Maggi", "biscuits", or "chips"
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
