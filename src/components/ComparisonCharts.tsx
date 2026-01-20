import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types/food';

interface ComparisonChartsProps {
  products: Product[];
}

const ComparisonCharts: React.FC<ComparisonChartsProps> = ({ products }) => {
  // Prepare data for bar chart
  const nutritionData = products.map(product => ({
    name: `${product.brand} - ${product.name}`,
    calories: product.nutrition.calories,
    protein: product.nutrition.protein,
    carbohydrates: product.nutrition.carbohydrates,
    fat: product.nutrition.fat,
    sugar: product.nutrition.sugar,
    sodium: product.nutrition.sodium / 100, // Scale down for better visualization
    fiber: product.nutrition.fiber,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'sodium' ? `${entry.value * 100}mg` : 
                          entry.name === 'calories' ? `${entry.value}` :
                          `${entry.value}g`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Nutrition Comparison Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Nutritional Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nutritionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100}
                  interval={0}
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="calories" fill="#8884d8" name="Calories" />
                <Bar dataKey="protein" fill="#82ca9d" name="Protein (g)" />
                <Bar dataKey="carbohydrates" fill="#ffc658" name="Carbs (g)" />
                <Bar dataKey="fat" fill="#ff7c7c" name="Fat (g)" />
                <Bar dataKey="sugar" fill="#ff6b6b" name="Sugar (g)" />
                <Bar dataKey="fiber" fill="#4ecdc4" name="Fiber (g)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Nutritional Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Product</th>
                  <th className="text-center p-2">Calories</th>
                  <th className="text-center p-2">Protein (g)</th>
                  <th className="text-center p-2">Carbs (g)</th>
                  <th className="text-center p-2">Fat (g)</th>
                  <th className="text-center p-2">Sugar (g)</th>
                  <th className="text-center p-2">Fiber (g)</th>
                  <th className="text-center p-2">Sodium (mg)</th>
                  <th className="text-center p-2">GI</th>
                  <th className="text-center p-2">Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground">{product.brand}</div>
                      </div>
                    </td>
                    <td className="text-center p-2">{product.nutrition.calories}</td>
                    <td className="text-center p-2">{product.nutrition.protein}</td>
                    <td className="text-center p-2">{product.nutrition.carbohydrates}</td>
                    <td className="text-center p-2">{product.nutrition.fat}</td>
                    <td className="text-center p-2">{product.nutrition.sugar}</td>
                    <td className="text-center p-2">{product.nutrition.fiber}</td>
                    <td className="text-center p-2">{product.nutrition.sodium}</td>
                    <td className="text-center p-2">{product.diabetic.glycemicIndex}</td>
                    <td className="text-center p-2">{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonCharts;
