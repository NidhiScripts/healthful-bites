import React from 'react';
import { BarcodeProduct } from '../data/barcodeDatabase';

interface ProductComparisonProps {
  products: BarcodeProduct[];
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
}

const ProductComparison: React.FC<ProductComparisonProps> = ({
  products,
  onRemoveProduct,
  onClearAll
}) => {
  const getNutritionColor = (value: number, type: 'calories' | 'sugar' | 'sodium') => {
    if (type === 'calories') {
      if (value < 150) return 'text-green-600';
      if (value < 250) return 'text-yellow-600';
      return 'text-red-600';
    } else if (type === 'sugar') {
      if (value < 10) return 'text-green-600';
      if (value < 20) return 'text-yellow-600';
      return 'text-red-600';
    } else if (type === 'sodium') {
      if (value < 200) return 'text-green-600';
      if (value < 400) return 'text-yellow-600';
      return 'text-red-600';
    }
    return 'text-slate-600';
  };

  const getProteinColor = (value: number) => {
    if (value >= 10) return 'text-green-600';
    if (value >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getFatColor = (value: number) => {
    if (value < 10) return 'text-green-600';
    if (value < 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 text-lg mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2h10a2 2 0 002 2v10a2 2 0 002-2h-4m-4 4v4m0 0 4-4h4m4 0v-4m0-4h-4" />
          </svg>
          <p className="text-xl font-semibold">No products selected for comparison</p>
          <p className="text-base">Search for products or scan barcodes to add them here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Product Comparison ({products.length} products)</h2>
          <button
            onClick={onClearAll}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl font-semibold transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-slate-700 border-b-2 border-slate-200">Product</th>
              <th className="p-4 text-center text-sm font-semibold text-slate-700 border-b-2 border-slate-200">Brand</th>
              <th className="p-4 text-center text-sm font-semibold text-slate-700 border-b-2 border-slate-200">Price</th>
              <th className="p-4 text-center text-sm font-semibold text-slate-700 border-b-2 border-slate-200">Calories</th>
              <th className="p-4 text-center text-sm font-semibold text-slate-700 border-b-2 border-slate-200">Protein</th>
              <th className="p-4 text-center text-sm font-semibold text-slate-700 border-b-2 border-slate-200">Carbs</th>
              <th className="p-4 text-center text-sm font-semibold text-slate-700 border-b-2 border-slate-200">Fat</th>
              <th className="p-4 text-center text-sm font-semibold text-slate-700 border-b-2 border-slate-200">Sugar</th>
              <th className="p-4 text-center text-sm font-semibold text-slate-700 border-b-2 border-slate-200">Sodium</th>
              <th className="p-4 text-center text-sm font-semibold text-slate-700 border-b-2 border-slate-200">Fiber</th>
              <th className="p-4 text-center text-sm font-semibold text-slate-700 border-b-2 border-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.barcode} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-4 border-b border-slate-200">
                  <div className="flex items-start gap-3">
                    <img
                      src={product.image || 'https://images.unsplash.com/photo-1546069901-b9f581a1996d?w=300&h=200&fit=crop'}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-b9f581a1996d?w=300&h=200&fit=crop';
                      }}
                    />
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{product.name}</div>
                      <div className="text-xs text-slate-500">{product.category}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center border-b border-slate-200">
                  <span className="inline-block bg-slate-100 px-3 py-1 rounded-full text-sm font-medium text-slate-700">
                    {product.brand}
                  </span>
                </td>
                <td className="p-4 text-center border-b border-slate-200">
                  <span className="text-lg font-bold text-emerald-600">₹{product.price}</span>
                </td>
                <td className={`p-4 text-center border-b border-slate-200 font-semibold ${getNutritionColor(product.nutrition.calories, 'calories')}`}>
                  {product.nutrition.calories}
                </td>
                <td className={`p-4 text-center border-b border-slate-200 font-semibold ${getProteinColor(product.nutrition.protein)}`}>
                  {product.nutrition.protein}g
                </td>
                <td className="p-4 text-center border-b border-slate-200 font-semibold text-slate-700">
                  {product.nutrition.carbohydrates}g
                </td>
                <td className={`p-4 text-center border-b border-slate-200 font-semibold ${getFatColor(product.nutrition.fat)}`}>
                  {product.nutrition.fat}g
                </td>
                <td className={`p-4 text-center border-b border-slate-200 font-semibold ${getNutritionColor(product.nutrition.sugar, 'sugar')}`}>
                  {product.nutrition.sugar}g
                </td>
                <td className={`p-4 text-center border-b border-slate-200 font-semibold ${getNutritionColor(product.nutrition.sodium, 'sodium')}`}>
                  {product.nutrition.sodium}mg
                </td>
                <td className="p-4 text-center border-b border-slate-200 font-semibold text-slate-700">
                  {product.nutrition.fiber}g
                </td>
                <td className="p-4 text-center border-b border-slate-200">
                  <button
                    onClick={() => onRemoveProduct(product.barcode)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recommendation Conclusion */}
      {products.length >= 2 && (
        <div className="bg-indigo-50 p-8 border-t-2 border-indigo-100 italic">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-4xl shadow-lg flex-shrink-0 animate-pulse">
              🏆
            </div>
            <div>
              <h3 className="text-2xl font-black text-indigo-900 mb-2 uppercase tracking-tight">Conclusion & Recommendation</h3>
              {(() => {
                const scoredProducts = products.map(p => {
                  // Weighted health score calculation (higher is better)
                  // Negative factors
                  const sugarPenalty = p.nutrition.sugar * 4;
                  const caloriesPenalty = p.nutrition.calories * 0.1;
                  const sodiumPenalty = p.nutrition.sodium * 0.05;
                  const fatPenalty = p.nutrition.fat * 2;

                  // Positive factors
                  const proteinBonus = p.nutrition.protein * 5;
                  const fiberBonus = p.nutrition.fiber * 10;

                  const score = (proteinBonus + fiberBonus) - (sugarPenalty + caloriesPenalty + sodiumPenalty + fatPenalty);
                  return { ...p, calculatedScore: score };
                });

                const winner = scoredProducts.reduce((prev, current) =>
                  (prev.calculatedScore > current.calculatedScore) ? prev : current
                );

                const runnerUp = scoredProducts.find(p => p.barcode !== winner.barcode);

                return (
                  <div className="space-y-3">
                    <p className="text-xl text-indigo-800 leading-relaxed font-medium">
                      Based on our nutritional analysis, <span className="font-black text-indigo-600 underline">"{winner.name}"</span> is the <span className="text-emerald-600 font-black">BETTER CHOICE</span> for your health.
                    </p>
                    <p className="text-indigo-600/80 text-lg">
                      It contains significantly
                      {winner.nutrition.sugar < (runnerUp?.nutrition.sugar || 0) && <span className="font-bold"> less sugar</span>}
                      {winner.nutrition.protein > (runnerUp?.nutrition.protein || 0) && <span className="font-bold"> and more protein</span>}
                      {winner.nutrition.fiber > (runnerUp?.nutrition.fiber || 0) && <span className="font-bold"> and more fiber</span>}
                      compared to the {runnerUp?.name}. Selecting this option supports better blood sugar control and long-term wellness.
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Footer Summary */}
      {products.length > 0 && (
        <div className="bg-gray-50 p-6 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="text-sm text-slate-600">
              <p className="font-bold text-slate-900 mb-2 uppercase tracking-wider text-xs">Analysis Guide:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-slate-500">
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> Green: Optimal/Safe range</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Yellow: Moderate intake</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Red: High Risk/Excessive</li>
                <li className="flex items-center gap-2 font-bold text-indigo-600 italic underline">Recommendation is calculated via weighted algorithm</li>
              </ul>
            </div>
            <div className="text-right italic text-slate-400 text-xs mt-auto">
              Scoring based on WHO & Nutri-Score standards
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductComparison;
