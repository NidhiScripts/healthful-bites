import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface NutritionChartProps {
  calories: number;
  sugar: number;
  fat: number;
  protein: number;
}

export const NutritionChart = ({ calories, sugar, fat, protein }: NutritionChartProps) => {
  const data = [
    { name: 'Calories', value: calories, max: 800, color: 'hsl(var(--chart-calories))' },
    { name: 'Sugar', value: sugar, max: 50, color: 'hsl(var(--chart-sugar))' },
    { name: 'Fat', value: fat, max: 50, color: 'hsl(var(--chart-fat))' },
    { name: 'Protein', value: protein, max: 40, color: 'hsl(var(--chart-protein))' },
  ];

  const normalizedData = data.map(item => ({
    ...item,
    percentage: Math.round((item.value / item.max) * 100)
  }));

  return (
    <div className="bg-card rounded-2xl p-5 border border-border">
      <h3 className="font-display font-bold text-foreground mb-4">Nutrition Breakdown</h3>
      <div className="space-y-4">
        {normalizedData.map((item) => (
          <div key={item.name} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">{item.name}</span>
              <span className="text-muted-foreground">
                {item.value}{item.name === 'Calories' ? ' kcal' : 'g'}
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ 
                  width: `${Math.min(item.percentage, 100)}%`,
                  backgroundColor: item.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const NutritionBarChart = ({ calories, sugar, fat, protein }: NutritionChartProps) => {
  const data = [
    { name: 'Cal', value: calories, fullName: 'Calories', unit: 'kcal', color: 'hsl(var(--chart-calories))' },
    { name: 'Sugar', value: sugar, fullName: 'Sugar', unit: 'g', color: 'hsl(var(--chart-sugar))' },
    { name: 'Fat', value: fat, fullName: 'Fat', unit: 'g', color: 'hsl(var(--chart-fat))' },
    { name: 'Protein', value: protein, fullName: 'Protein', unit: 'g', color: 'hsl(var(--chart-protein))' },
  ];

  return (
    <div className="bg-card rounded-2xl p-5 border border-border">
      <h3 className="font-display font-bold text-foreground mb-4">Quick View</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30 }}>
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              width={50}
            />
            <Bar 
              dataKey="value" 
              radius={[0, 8, 8, 0]}
              barSize={24}
              label={{ 
                position: 'right', 
                fill: 'hsl(var(--foreground))',
                fontSize: 12,
                fontWeight: 600,
                formatter: (value: number, entry: any) => {
                  const item = data.find(d => d.value === value);
                  return item ? `${value}${item.unit}` : value;
                }
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
