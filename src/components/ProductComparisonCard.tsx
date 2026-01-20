import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Product, ComparisonResult } from '@/types/food';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

interface ProductComparisonCardProps {
  comparisonResult: ComparisonResult;
  isBest?: {
    healthiest?: boolean;
    diabetic?: boolean;
    lowestCalorie?: boolean;
    highestProtein?: boolean;
  };
}

const ProductComparisonCard: React.FC<ProductComparisonCardProps> = ({ 
  comparisonResult, 
  isBest = {} 
}) => {
  const { product, healthScore, diabeticScore, allergenRisk, recommendations } = comparisonResult;

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (value: number, max: number, inverse: boolean = false) => {
    const percentage = (value / max) * 100;
    if (inverse) {
      if (percentage <= 30) return 'bg-green-500';
      if (percentage <= 60) return 'bg-yellow-500';
      return 'bg-red-500';
    } else {
      if (percentage >= 70) return 'bg-green-500';
      if (percentage >= 40) return 'bg-yellow-500';
      return 'bg-red-500';
    }
  };

  return (
    <Card className={`relative ${isBest.healthiest || isBest.diabetic ? 'ring-2 ring-green-500' : ''}`}>
      {(isBest.healthiest || isBest.diabetic || isBest.lowestCalorie || isBest.highestProtein) && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge className="bg-green-500 text-white">
            {isBest.healthiest && 'Healthiest'}
            {isBest.diabetic && 'Best for Diabetics'}
            {isBest.lowestCalorie && 'Lowest Calories'}
            {isBest.highestProtein && 'Highest Protein'}
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">₹{product.price}</p>
            <p className="text-xs text-muted-foreground">{product.servingSize}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Scores */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Health Score</span>
              <span className={`text-sm font-bold ${getScoreColor(healthScore)}`}>
                {healthScore}/10
              </span>
            </div>
            <Progress value={healthScore * 10} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Diabetic Score</span>
              <span className={`text-sm font-bold ${getScoreColor(diabeticScore)}`}>
                {diabeticScore}/10
              </span>
            </div>
            <Progress value={diabeticScore * 10} className="h-2" />
          </div>
        </div>

        {/* Allergen Risk */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Allergen Risk:</span>
          <Badge className={getRiskColor(allergenRisk)}>
            {allergenRisk.charAt(0).toUpperCase() + allergenRisk.slice(1)}
          </Badge>
        </div>

        {/* Diabetic Friendly */}
        <div className="flex items-center gap-2">
          {product.diabetic.isDiabeticFriendly ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">Diabetic Friendly</span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-600">Not Diabetic Friendly</span>
            </>
          )}
        </div>

        {/* Nutritional Info */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Nutrition (per serving)</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span>Calories:</span>
              <span className="font-medium">{product.nutrition.calories}</span>
            </div>
            <div className="flex justify-between">
              <span>Protein:</span>
              <span className="font-medium">{product.nutrition.protein}g</span>
            </div>
            <div className="flex justify-between">
              <span>Carbs:</span>
              <span className="font-medium">{product.nutrition.carbohydrates}g</span>
            </div>
            <div className="flex justify-between">
              <span>Fat:</span>
              <span className="font-medium">{product.nutrition.fat}g</span>
            </div>
            <div className="flex justify-between">
              <span>Sugar:</span>
              <span className="font-medium">{product.nutrition.sugar}g</span>
            </div>
            <div className="flex justify-between">
              <span>Fiber:</span>
              <span className="font-medium">{product.nutrition.fiber}g</span>
            </div>
            <div className="flex justify-between">
              <span>Sodium:</span>
              <span className="font-medium">{product.nutrition.sodium}mg</span>
            </div>
            <div className="flex justify-between">
              <span>Glycemic Index:</span>
              <span className="font-medium">{product.diabetic.glycemicIndex}</span>
            </div>
          </div>
        </div>

        {/* Allergens */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Allergens</h4>
          <div className="flex flex-wrap gap-1">
            {Object.entries(product.allergens).map(([allergen, hasAllergen]) => 
              hasAllergen && (
                <Badge key={allergen} variant="outline" className="text-xs">
                  {allergen.charAt(0).toUpperCase() + allergen.slice(1)}
                </Badge>
              )
            )}
            {!Object.values(product.allergens).some(Boolean) && (
              <span className="text-xs text-muted-foreground">No common allergens</span>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Recommendations</h4>
          <div className="space-y-1">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-2">
                <Info className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients Preview */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Key Ingredients</h4>
          <div className="text-xs text-muted-foreground">
            {product.ingredients.slice(0, 3).join(', ')}
            {product.ingredients.length > 3 && '...'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductComparisonCard;
