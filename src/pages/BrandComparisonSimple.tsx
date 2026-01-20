import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, BarChart3, Filter, TrendingUp, Users } from 'lucide-react';

// Mock data for testing
const mockCategories = [
  { id: 'instant-noodles', name: 'Instant Noodles' },
  { id: 'chips-snacks', name: 'Chips & Salty Snacks' },
  { id: 'chocolates', name: 'Chocolates' },
];

const mockProducts = [
  {
    id: '1',
    name: 'Maggi 2-Minute Noodles',
    brand: 'Maggi',
    category: 'Instant Noodles',
    nutrition: { calories: 380, protein: 8, carbohydrates: 56, fat: 15, fiber: 2, sugar: 2, sodium: 850 },
    price: 15
  },
  {
    id: '2',
    name: 'Lays Classic Chips',
    brand: 'Lays',
    category: 'Chips & Salty Snacks',
    nutrition: { calories: 160, protein: 2, carbohydrates: 15, fat: 10, fiber: 1, sugar: 0.5, sodium: 170 },
    price: 20
  }
];

const BrandComparison: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredProducts = selectedCategory 
    ? mockProducts.filter(p => p.category.toLowerCase().includes(selectedCategory.replace('-', ' ')))
    : mockProducts;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/test')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          <h1 className="text-3xl font-bold mb-2">Brand Comparison</h1>
          <p className="text-white/90">
            Compare nutritional values, diabetic-friendliness, and allergens across different food brands
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <label className="text-sm font-medium mb-2 block">Select Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a category..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {mockCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Lowest Calories</p>
                    <p className="font-semibold">{filteredProducts[0].name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Best Value</p>
                    <p className="font-semibold">{filteredProducts[0].name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results */}
        {filteredProducts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                Select a category to see comparisons
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">₹{product.price}</span>
                    <Badge>Sample Product</Badge>
                  </div>
                  
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
                        <span>Sodium:</span>
                        <span className="font-medium">{product.nutrition.sodium}mg</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      This is a simplified version for testing. Full nutritional data and comparison features will be available.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandComparison;
