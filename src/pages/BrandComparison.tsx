import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, BarChart3, Filter, TrendingUp, Users } from 'lucide-react';
import { foodCategories, getAllProducts } from '@/data/brandComparisonData';
import { compareProducts, getBestForDiabetics, getHealthiestOption, getLowestCalorie, getHighestProtein } from '@/utils/comparisonUtils';
import ProductComparisonCard from '@/components/ProductComparisonCard';
import ComparisonCharts from '@/components/ComparisonCharts';
import { Product } from '@/types/food';

const BrandComparison: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showCharts, setShowCharts] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'charts'>('cards');

  const allProducts = getAllProducts();
  const filteredProducts = selectedCategory 
    ? foodCategories.find(cat => cat.id === selectedCategory)?.brands
        .filter(brand => selectedBrands.length === 0 || selectedBrands.includes(brand.id))
        .flatMap(brand => brand.products) || []
    : allProducts;

  const comparisonResults = compareProducts(filteredProducts);
  
  const bestProducts = {
    healthiest: filteredProducts.length > 0 ? getHealthiestOption(filteredProducts) : null,
    diabetic: filteredProducts.length > 0 ? getBestForDiabetics(filteredProducts) : null,
    lowestCalorie: filteredProducts.length > 0 ? getLowestCalorie(filteredProducts) : null,
    highestProtein: filteredProducts.length > 0 ? getHighestProtein(filteredProducts) : null,
  };

  const handleBrandToggle = (brandId: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const getBestFlags = (product: Product) => ({
    healthiest: bestProducts.healthiest?.id === product.id,
    diabetic: bestProducts.diabetic?.id === product.id,
    lowestCalorie: bestProducts.lowestCalorie?.id === product.id,
    highestProtein: bestProducts.highestProtein?.id === product.id,
  });

  const selectedCategoryData = selectedCategory 
    ? foodCategories.find(cat => cat.id === selectedCategory)
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <h1 className="text-3xl font-bold mb-2">Brand Comparison</h1>
          <p className="text-white/90">
            Compare nutritional values, diabetic-friendliness, and allergens across different food brands
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filters Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Category Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Select Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a category..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {foodCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Brand Selection */}
            {selectedCategoryData && (
              <div>
                <label className="text-sm font-medium mb-2 block">Select Brands</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {selectedCategoryData.brands.map(brand => (
                    <div key={brand.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand.id}
                        checked={selectedBrands.includes(brand.id)}
                        onCheckedChange={() => handleBrandToggle(brand.id)}
                      />
                      <label htmlFor={brand.id} className="text-sm">
                        {brand.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View Mode */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">View Mode:</label>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                >
                  Cards
                </Button>
                <Button
                  variant={viewMode === 'charts' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('charts')}
                  disabled={filteredProducts.length === 0}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Charts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Healthiest</p>
                    <p className="font-semibold">{bestProducts.healthiest?.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Best for Diabetics</p>
                    <p className="font-semibold">{bestProducts.diabetic?.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Lowest Calories</p>
                    <p className="font-semibold">{bestProducts.lowestCalorie?.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Highest Protein</p>
                    <p className="font-semibold">{bestProducts.highestProtein?.name}</p>
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
                {selectedCategory ? 'Select at least one brand to see comparisons' : 'Select a category to start comparing products'}
              </p>
            </CardContent>
          </Card>
        ) : viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisonResults.map((result) => (
              <ProductComparisonCard
                key={result.product.id}
                comparisonResult={result}
                isBest={getBestFlags(result.product)}
              />
            ))}
          </div>
        ) : (
          <ComparisonCharts products={filteredProducts} />
        )}
      </div>
    </div>
  );
};

export default BrandComparison;
