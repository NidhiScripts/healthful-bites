export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'snacks' | 'breakfast' | 'lunch';
  nutrition: {
    calories: number;
    sugar: number;
    fat: number;
    protein: number;
  };
  healthScore: number;
  healthStatus: 'safe' | 'moderate' | 'high-risk';
  badges: string[];
  healthNote: string;
}

export const foodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Greek Yogurt Parfait',
    description: 'Creamy yogurt layered with fresh berries and granola',
    price: 199,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
    category: 'breakfast',
    nutrition: { calories: 220, sugar: 12, fat: 6, protein: 18 },
    healthScore: 9,
    healthStatus: 'safe',
    badges: ['High Protein', 'Low Fat'],
    healthNote: 'Excellent source of probiotics and protein. Great for gut health and muscle recovery.'
  },
  {
    id: '2',
    name: 'Avocado Toast',
    description: 'Whole grain toast with smashed avocado and poached eggs',
    price: 299,
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
    category: 'breakfast',
    nutrition: { calories: 380, sugar: 4, fat: 22, protein: 16 },
    healthScore: 8,
    healthStatus: 'safe',
    badges: ['Low Sugar', 'Heart Healthy'],
    healthNote: 'Rich in healthy fats and fiber. Supports heart health and provides sustained energy.'
  },
  {
    id: '3',
    name: 'Veggie Omelette',
    description: 'Fluffy eggs with spinach, tomatoes, and feta cheese',
    price: 249,
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=300&fit=crop',
    category: 'breakfast',
    nutrition: { calories: 320, sugar: 3, fat: 18, protein: 24 },
    healthScore: 9,
    healthStatus: 'safe',
    badges: ['High Protein', 'Keto Friendly'],
    healthNote: 'Packed with vitamins and minerals. Excellent protein source for muscle maintenance.'
  },
  {
    id: '4',
    name: 'Berry Smoothie Bowl',
    description: 'Blended berries topped with chia seeds and coconut',
    price: 229,
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
    category: 'breakfast',
    nutrition: { calories: 280, sugar: 24, fat: 8, protein: 8 },
    healthScore: 7,
    healthStatus: 'moderate',
    badges: ['Antioxidant Rich', 'Vegan'],
    healthNote: 'High in antioxidants but watch sugar content. Natural sugars from fruits.'
  },
  {
    id: '5',
    name: 'Grilled Chicken Salad',
    description: 'Fresh greens with grilled chicken and light vinaigrette',
    price: 349,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 350, sugar: 6, fat: 12, protein: 35 },
    healthScore: 9,
    healthStatus: 'safe',
    badges: ['High Protein', 'Diet Friendly'],
    healthNote: 'Perfect balanced meal. Low carb, high protein option for weight management.'
  },
  {
    id: '6',
    name: 'Quinoa Buddha Bowl',
    description: 'Nutrient-rich quinoa with roasted vegetables and tahini',
    price: 329,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 420, sugar: 8, fat: 16, protein: 18 },
    healthScore: 9,
    healthStatus: 'safe',
    badges: ['Vegan', 'Fiber Rich'],
    healthNote: 'Complete protein source. Excellent for plant-based nutrition.'
  },
  {
    id: '7',
    name: 'Salmon Poke Bowl',
    description: 'Fresh salmon with rice, edamame, and sesame dressing',
    price: 449,
    image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 480, sugar: 10, fat: 18, protein: 32 },
    healthScore: 8,
    healthStatus: 'safe',
    badges: ['Omega-3 Rich', 'Brain Food'],
    healthNote: 'Excellent source of omega-3 fatty acids. Supports brain and heart health.'
  },
  {
    id: '8',
    name: 'Turkey Wrap',
    description: 'Lean turkey with hummus and fresh vegetables in whole wheat',
    price: 279,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 380, sugar: 5, fat: 14, protein: 28 },
    healthScore: 8,
    healthStatus: 'safe',
    badges: ['High Protein', 'Balanced'],
    healthNote: 'Lean protein with complex carbs. Great for sustained energy throughout the day.'
  },
  {
    id: '9',
    name: 'Mixed Nuts',
    description: 'Assorted raw almonds, cashews, and walnuts',
    price: 149,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 180, sugar: 2, fat: 16, protein: 6 },
    healthScore: 8,
    healthStatus: 'safe',
    badges: ['Low Sugar', 'Heart Healthy'],
    healthNote: 'Rich in healthy fats and minerals. Great for heart health in moderation.'
  },
  {
    id: '10',
    name: 'Hummus & Veggies',
    description: 'Creamy hummus with carrot and cucumber sticks',
    price: 179,
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 150, sugar: 4, fat: 8, protein: 6 },
    healthScore: 9,
    healthStatus: 'safe',
    badges: ['Low Calorie', 'Vegan'],
    healthNote: 'Fiber-rich and satisfying. Excellent choice for guilt-free snacking.'
  },
  {
    id: '11',
    name: 'Protein Energy Balls',
    description: 'Oat and peanut butter bites with dark chocolate',
    price: 129,
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 200, sugar: 14, fat: 10, protein: 8 },
    healthScore: 7,
    healthStatus: 'moderate',
    badges: ['Energy Boost', 'No Bake'],
    healthNote: 'Good pre-workout snack. Contains natural sugars for quick energy.'
  },
  {
    id: '12',
    name: 'Cheese Crackers',
    description: 'Whole grain crackers with aged cheddar',
    price: 139,
    image: 'https://images.unsplash.com/photo-1589010588553-46e8e7c21788?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 220, sugar: 2, fat: 14, protein: 8 },
    healthScore: 6,
    healthStatus: 'moderate',
    badges: ['Calcium Rich', 'Whole Grain'],
    healthNote: 'Good calcium source but higher in saturated fat. Enjoy in moderation.'
  },
  {
    id: '13',
    name: 'Pancake Stack',
    description: 'Fluffy buttermilk pancakes with maple syrup',
    price: 219,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    category: 'breakfast',
    nutrition: { calories: 520, sugar: 38, fat: 18, protein: 10 },
    healthScore: 4,
    healthStatus: 'high-risk',
    badges: ['Comfort Food'],
    healthNote: 'High in sugar and refined carbs. Best as an occasional treat.'
  },
  {
    id: '14',
    name: 'Crispy Fries',
    description: 'Golden potato fries with herbs and sea salt',
    price: 99,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 380, sugar: 1, fat: 22, protein: 4 },
    healthScore: 3,
    healthStatus: 'high-risk',
    badges: ['Comfort Food'],
    healthNote: 'High in saturated fat and calories. Consider healthier alternatives.'
  },
  {
    id: '15',
    name: 'Burger Deluxe',
    description: 'Beef patty with cheese, lettuce, and special sauce',
    price: 399,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 680, sugar: 8, fat: 42, protein: 35 },
    healthScore: 4,
    healthStatus: 'high-risk',
    badges: ['High Protein'],
    healthNote: 'Very high in saturated fat. Choose grilled or lean options when possible.'
  },
  {
    id: '16',
    name: 'Green Detox Juice',
    description: 'Fresh kale, apple, ginger, and lemon blend',
    price: 189,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 120, sugar: 20, fat: 0, protein: 2 },
    healthScore: 7,
    healthStatus: 'moderate',
    badges: ['Vitamin Rich', 'Detox'],
    healthNote: 'High in vitamins but contains natural sugars. Good for occasional detox.'
  }
];

export const getHealthStatusColor = (status: string) => {
  switch (status) {
    case 'safe': return 'safe';
    case 'moderate': return 'moderate';
    case 'high-risk': return 'high-risk';
    default: return 'safe';
  }
};

export const getHealthStatusLabel = (status: string) => {
  switch (status) {
    case 'safe': return 'Safe';
    case 'moderate': return 'Moderate Risk';
    case 'high-risk': return 'High Risk';
    default: return 'Unknown';
  }
};

export const formatPrice = (price: number) => {
  return `₹${price.toLocaleString('en-IN')}`;
};
