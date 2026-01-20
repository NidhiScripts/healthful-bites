import React from 'react';
import { BarcodeProduct } from '../data/barcodeDatabase';

interface BarcodeResultProps {
  product: BarcodeProduct;
  onClose: () => void;
  onScanAnother: () => void;
  onAddToComparison?: (product: BarcodeProduct) => void;
}

const BarcodeResult: React.FC<BarcodeResultProps> = ({ product, onClose, onScanAnother, onAddToComparison }) => {
  const fallbackImage = 'https://images.unsplash.com/photo-1546069901-b9f581a1996d?w=300&h=200&fit=crop';

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Product Details</h2>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {onAddToComparison && (
            <button
              onClick={() => onAddToComparison(product)}
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors ml-2"
              title="Add to Comparison"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H8a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-8a2 2 0 00-2-2h-4m-4 4v4m0 0 4-4h4m4 0v-4m0-4h-4" />
              </svg>
            </button>
          )}
        </div>
        <p className="mt-2 text-white/80">Barcode: {product.barcode}</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {/* Product Image and Basic Info */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
            <div className="relative">
              <img
                src={product.image || fallbackImage}
                alt={product.name}
                className="w-full h-64 sm:h-80 object-cover"
                onError={(e) => {
                  e.currentTarget.src = fallbackImage;
                }}
              />
              <div className="absolute top-4 left-4 bg-white/95 px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-bold text-slate-900">{product.brand}</span>
              </div>
              <div className="absolute top-4 right-4 bg-emerald-600 px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-bold text-white">₹{product.price}</span>
              </div>
            </div>
            
            <div className="p-6">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
              <p className="text-xl text-slate-600 mb-4">{product.category}</p>
              
              {product.servingSize && (
                <div className="bg-slate-100 rounded-xl p-3 inline-block">
                  <span className="text-sm font-semibold text-slate-600">Serving Size: {product.servingSize}</span>
                </div>
              )}
            </div>
          </div>

          {/* Nutrition Information */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Nutrition Information</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">{product.nutrition.calories}</div>
                <div className="text-sm font-semibold text-blue-800 mt-1">Calories</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-green-600">{product.nutrition.protein}g</div>
                <div className="text-sm font-semibold text-green-800 mt-1">Protein</div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-orange-600">{product.nutrition.carbohydrates}g</div>
                <div className="text-sm font-semibold text-orange-800 mt-1">Carbs</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">{product.nutrition.fat}g</div>
                <div className="text-sm font-semibold text-purple-800 mt-1">Fat</div>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-pink-600">{product.nutrition.sugar}g</div>
                <div className="text-sm font-semibold text-pink-800 mt-1">Sugar</div>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-red-600">{product.nutrition.sodium}mg</div>
                <div className="text-sm font-semibold text-red-800 mt-1">Sodium</div>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-indigo-600">{product.nutrition.fiber}g</div>
                <div className="text-sm font-semibold text-indigo-800 mt-1">Fiber</div>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Ingredients</h2>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Allergens */}
          {product.allergens && product.allergens.length > 0 && (
            <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Allergens</h2>
              <div className="flex flex-wrap gap-2">
                {product.allergens.map((allergen, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold border border-red-200"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-white p-4 border-t">
        <div className="flex gap-4 justify-center">
          <button
            onClick={onScanAnother}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Scan Another Product
          </button>
          
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeResult;
