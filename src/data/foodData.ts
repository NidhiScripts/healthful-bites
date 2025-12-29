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
  ingredients: string[];
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
    healthNote: 'Excellent source of probiotics and protein. Great for gut health and muscle recovery.',
    ingredients: ['Greek Yogurt', 'Fresh Strawberries', 'Blueberries', 'Honey', 'Granola', 'Chia Seeds']
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
    healthNote: 'Rich in healthy fats and fiber. Supports heart health and provides sustained energy.',
    ingredients: ['Whole Grain Bread', 'Ripe Avocado', 'Poached Eggs', 'Cherry Tomatoes', 'Red Pepper Flakes', 'Olive Oil', 'Sea Salt']
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
    healthNote: 'Packed with vitamins and minerals. Excellent protein source for muscle maintenance.',
    ingredients: ['Farm Fresh Eggs', 'Baby Spinach', 'Roma Tomatoes', 'Feta Cheese', 'Bell Peppers', 'Onions', 'Butter']
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
    healthNote: 'High in antioxidants but watch sugar content. Natural sugars from fruits.',
    ingredients: ['Mixed Berries', 'Banana', 'Almond Milk', 'Chia Seeds', 'Coconut Flakes', 'Hemp Seeds', 'Agave Nectar']
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
    healthNote: 'Perfect balanced meal. Low carb, high protein option for weight management.',
    ingredients: ['Grilled Chicken Breast', 'Mixed Greens', 'Cherry Tomatoes', 'Cucumber', 'Red Onion', 'Olive Oil Vinaigrette', 'Parmesan Cheese']
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
    healthNote: 'Complete protein source. Excellent for plant-based nutrition.',
    ingredients: ['Organic Quinoa', 'Roasted Sweet Potato', 'Chickpeas', 'Kale', 'Avocado', 'Tahini Dressing', 'Sesame Seeds']
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
    healthNote: 'Excellent source of omega-3 fatty acids. Supports brain and heart health.',
    ingredients: ['Fresh Salmon', 'Sushi Rice', 'Edamame', 'Cucumber', 'Avocado', 'Seaweed', 'Sesame Ginger Dressing', 'Pickled Ginger']
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
    healthNote: 'Lean protein with complex carbs. Great for sustained energy throughout the day.',
    ingredients: ['Whole Wheat Tortilla', 'Sliced Turkey Breast', 'Hummus', 'Lettuce', 'Tomato', 'Red Onion', 'Cucumber', 'Feta Cheese']
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
    healthNote: 'Rich in healthy fats and minerals. Great for heart health in moderation.',
    ingredients: ['Raw Almonds', 'Cashews', 'Walnuts', 'Pecans', 'Sea Salt']
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
    healthNote: 'Fiber-rich and satisfying. Excellent choice for guilt-free snacking.',
    ingredients: ['Chickpeas', 'Tahini', 'Lemon Juice', 'Garlic', 'Olive Oil', 'Fresh Carrots', 'Cucumber', 'Bell Peppers']
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
    healthNote: 'Good pre-workout snack. Contains natural sugars for quick energy.',
    ingredients: ['Rolled Oats', 'Peanut Butter', 'Dark Chocolate Chips', 'Honey', 'Flax Seeds', 'Vanilla Extract']
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
    healthNote: 'Good calcium source but higher in saturated fat. Enjoy in moderation.',
    ingredients: ['Whole Grain Crackers', 'Aged Cheddar Cheese', 'Rosemary', 'Black Pepper']
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
    healthNote: 'High in sugar and refined carbs. Best as an occasional treat.',
    ingredients: ['All-Purpose Flour', 'Buttermilk', 'Eggs', 'Butter', 'Maple Syrup', 'Baking Powder', 'Vanilla Extract', 'Whipped Cream']
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
    healthNote: 'High in saturated fat and calories. Consider healthier alternatives.',
    ingredients: ['Russet Potatoes', 'Vegetable Oil', 'Sea Salt', 'Rosemary', 'Garlic Powder', 'Paprika']
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
    healthNote: 'Very high in saturated fat. Choose grilled or lean options when possible.',
    ingredients: ['Beef Patty', 'Brioche Bun', 'Cheddar Cheese', 'Lettuce', 'Tomato', 'Pickles', 'Onion', 'Special Sauce', 'Ketchup']
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
    healthNote: 'High in vitamins but contains natural sugars. Good for occasional detox.',
    ingredients: ['Fresh Kale', 'Green Apple', 'Ginger Root', 'Lemon', 'Celery', 'Cucumber', 'Mint Leaves']
  },
  // Indian Food Items
  {
    id: '17',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato masala',
    price: 149,
    image: 'https://images.unsplash.com/photo-1668236543090-82eb5eaf38a6?w=400&h=300&fit=crop',
    category: 'breakfast',
    nutrition: { calories: 350, sugar: 4, fat: 12, protein: 8 },
    healthScore: 7,
    healthStatus: 'moderate',
    badges: ['Vegetarian', 'South Indian'],
    healthNote: 'Fermented batter aids digestion. Good source of carbs for energy.',
    ingredients: ['Rice Batter', 'Urad Dal', 'Potatoes', 'Onions', 'Mustard Seeds', 'Curry Leaves', 'Green Chilies', 'Turmeric']
  },
  {
    id: '18',
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese marinated in aromatic spices',
    price: 279,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 280, sugar: 3, fat: 18, protein: 16 },
    healthScore: 8,
    healthStatus: 'safe',
    badges: ['High Protein', 'Vegetarian'],
    healthNote: 'Rich in protein and calcium. Great vegetarian protein source.',
    ingredients: ['Paneer', 'Yogurt', 'Ginger Garlic Paste', 'Red Chili Powder', 'Garam Masala', 'Bell Peppers', 'Onions', 'Lemon']
  },
  {
    id: '19',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with spiced chicken',
    price: 349,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 550, sugar: 5, fat: 22, protein: 32 },
    healthScore: 6,
    healthStatus: 'moderate',
    badges: ['High Protein', 'Aromatic'],
    healthNote: 'Complete meal with protein and carbs. Watch portion sizes.',
    ingredients: ['Basmati Rice', 'Chicken', 'Yogurt', 'Onions', 'Tomatoes', 'Biryani Masala', 'Saffron', 'Mint', 'Ghee']
  },
  {
    id: '20',
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas',
    price: 49,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 260, sugar: 2, fat: 16, protein: 4 },
    healthScore: 4,
    healthStatus: 'high-risk',
    badges: ['Street Food', 'Vegetarian'],
    healthNote: 'Deep fried snack. High in fat, enjoy occasionally.',
    ingredients: ['All-Purpose Flour', 'Potatoes', 'Green Peas', 'Cumin', 'Coriander', 'Green Chilies', 'Garam Masala', 'Oil']
  },
  {
    id: '21',
    name: 'Dal Tadka',
    description: 'Yellow lentils tempered with aromatic spices',
    price: 179,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 220, sugar: 3, fat: 8, protein: 14 },
    healthScore: 9,
    healthStatus: 'safe',
    badges: ['High Protein', 'Vegan'],
    healthNote: 'Excellent plant-based protein. Rich in fiber and nutrients.',
    ingredients: ['Yellow Lentils', 'Tomatoes', 'Onions', 'Garlic', 'Cumin', 'Turmeric', 'Red Chilies', 'Ghee', 'Coriander']
  },
  {
    id: '22',
    name: 'Chole Bhature',
    description: 'Spiced chickpea curry with fluffy fried bread',
    price: 199,
    image: 'https://images.unsplash.com/photo-1626132647523-66c3bf6da5fc?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 580, sugar: 8, fat: 28, protein: 18 },
    healthScore: 4,
    healthStatus: 'high-risk',
    badges: ['Comfort Food', 'North Indian'],
    healthNote: 'High calorie traditional dish. Best enjoyed occasionally.',
    ingredients: ['Chickpeas', 'All-Purpose Flour', 'Onions', 'Tomatoes', 'Ginger', 'Garlic', 'Chole Masala', 'Yogurt']
  },
  {
    id: '23',
    name: 'Idli Sambhar',
    description: 'Steamed rice cakes with lentil vegetable stew',
    price: 129,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
    category: 'breakfast',
    nutrition: { calories: 180, sugar: 4, fat: 2, protein: 8 },
    healthScore: 9,
    healthStatus: 'safe',
    badges: ['Low Fat', 'South Indian'],
    healthNote: 'Light and nutritious. Fermented food great for digestion.',
    ingredients: ['Rice', 'Urad Dal', 'Toor Dal', 'Mixed Vegetables', 'Tamarind', 'Curry Leaves', 'Mustard Seeds', 'Sambhar Powder']
  },
  {
    id: '24',
    name: 'Palak Paneer',
    description: 'Cottage cheese cubes in creamy spinach gravy',
    price: 259,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 320, sugar: 4, fat: 22, protein: 18 },
    healthScore: 8,
    healthStatus: 'safe',
    badges: ['Iron Rich', 'Vegetarian'],
    healthNote: 'Iron-rich spinach with protein. Great for vegetarians.',
    ingredients: ['Paneer', 'Spinach', 'Onions', 'Tomatoes', 'Garlic', 'Ginger', 'Cream', 'Garam Masala', 'Cumin']
  },
  // Noodles
  {
    id: '25',
    name: 'Hakka Noodles',
    description: 'Stir-fried noodles with vegetables and soy sauce',
    price: 179,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 380, sugar: 6, fat: 14, protein: 10 },
    healthScore: 6,
    healthStatus: 'moderate',
    badges: ['Indo-Chinese', 'Vegetarian'],
    healthNote: 'Refined flour noodles. Add more veggies for better nutrition.',
    ingredients: ['Noodles', 'Cabbage', 'Carrots', 'Bell Peppers', 'Spring Onions', 'Soy Sauce', 'Vinegar', 'Garlic', 'Chili Sauce']
  },
  {
    id: '26',
    name: 'Schezwan Noodles',
    description: 'Spicy noodles tossed in fiery schezwan sauce',
    price: 199,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 420, sugar: 8, fat: 18, protein: 12 },
    healthScore: 5,
    healthStatus: 'moderate',
    badges: ['Spicy', 'Indo-Chinese'],
    healthNote: 'Very spicy and high in sodium. Consume in moderation.',
    ingredients: ['Noodles', 'Schezwan Sauce', 'Vegetables', 'Garlic', 'Ginger', 'Soy Sauce', 'Red Chilies', 'Spring Onions']
  },
  {
    id: '27',
    name: 'Maggi Noodles',
    description: 'Classic instant noodles with masala seasoning',
    price: 79,
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 320, sugar: 4, fat: 14, protein: 8 },
    healthScore: 4,
    healthStatus: 'high-risk',
    badges: ['Quick Meal', 'Comfort Food'],
    healthNote: 'Processed instant food. High in sodium, occasional treat only.',
    ingredients: ['Wheat Noodles', 'Masala Seasoning', 'Palm Oil', 'Salt', 'Vegetables', 'Dried Onion']
  },
  {
    id: '28',
    name: 'Pad Thai Noodles',
    description: 'Thai rice noodles with tamarind sauce and peanuts',
    price: 289,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 450, sugar: 12, fat: 16, protein: 14 },
    healthScore: 6,
    healthStatus: 'moderate',
    badges: ['Thai Cuisine', 'Gluten-Free'],
    healthNote: 'Rice noodles are gluten-free. Contains natural sugars from tamarind.',
    ingredients: ['Rice Noodles', 'Tamarind Paste', 'Peanuts', 'Bean Sprouts', 'Tofu', 'Eggs', 'Lime', 'Fish Sauce', 'Palm Sugar']
  },
  // More Snacks
  {
    id: '29',
    name: 'Vada Pav',
    description: 'Mumbai street food - spiced potato fritter in bread',
    price: 59,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 340, sugar: 4, fat: 18, protein: 6 },
    healthScore: 4,
    healthStatus: 'high-risk',
    badges: ['Street Food', 'Mumbai Special'],
    healthNote: 'Deep fried snack. High in carbs and fat.',
    ingredients: ['Pav Bread', 'Potato Vada', 'Gram Flour', 'Green Chutney', 'Tamarind Chutney', 'Garlic Chutney', 'Green Chilies']
  },
  {
    id: '30',
    name: 'Pani Puri',
    description: 'Crispy puris filled with tangy spiced water',
    price: 69,
    image: 'https://images.unsplash.com/photo-1626132647523-66c3bf6da5fc?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 180, sugar: 6, fat: 8, protein: 4 },
    healthScore: 5,
    healthStatus: 'moderate',
    badges: ['Street Food', 'Tangy'],
    healthNote: 'Fun snack but ensure hygiene. Watch the spice level.',
    ingredients: ['Semolina Puris', 'Boiled Potatoes', 'Chickpeas', 'Tamarind Water', 'Mint Water', 'Chaat Masala', 'Onions']
  },
  {
    id: '31',
    name: 'Aloo Tikki',
    description: 'Crispy spiced potato patties with chutneys',
    price: 89,
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 220, sugar: 3, fat: 12, protein: 4 },
    healthScore: 5,
    healthStatus: 'moderate',
    badges: ['Street Food', 'Vegetarian'],
    healthNote: 'Pan-fried option healthier than deep fried.',
    ingredients: ['Potatoes', 'Green Peas', 'Corn Flour', 'Cumin', 'Coriander', 'Green Chutney', 'Tamarind Chutney', 'Yogurt']
  },
  {
    id: '32',
    name: 'Bhel Puri',
    description: 'Puffed rice mixed with veggies and tangy chutneys',
    price: 79,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 160, sugar: 8, fat: 4, protein: 4 },
    healthScore: 6,
    healthStatus: 'moderate',
    badges: ['Low Calorie', 'Chaat'],
    healthNote: 'Light snack with fiber. Watch the sodium from chutneys.',
    ingredients: ['Puffed Rice', 'Sev', 'Onions', 'Tomatoes', 'Boiled Potatoes', 'Tamarind Chutney', 'Green Chutney', 'Chaat Masala']
  },
  {
    id: '33',
    name: 'Dhokla',
    description: 'Steamed savory gram flour cake from Gujarat',
    price: 99,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 140, sugar: 4, fat: 4, protein: 6 },
    healthScore: 8,
    healthStatus: 'safe',
    badges: ['Steamed', 'Low Fat'],
    healthNote: 'Steamed and fermented. Healthy snack option.',
    ingredients: ['Gram Flour', 'Yogurt', 'Ginger', 'Green Chilies', 'Mustard Seeds', 'Curry Leaves', 'Coconut', 'Coriander']
  },
  {
    id: '34',
    name: 'Poha',
    description: 'Flattened rice tempered with peanuts and spices',
    price: 89,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
    category: 'breakfast',
    nutrition: { calories: 250, sugar: 2, fat: 8, protein: 6 },
    healthScore: 7,
    healthStatus: 'moderate',
    badges: ['Light Meal', 'Gujarati'],
    healthNote: 'Light and easy to digest. Good breakfast option.',
    ingredients: ['Flattened Rice', 'Peanuts', 'Onions', 'Green Chilies', 'Mustard Seeds', 'Curry Leaves', 'Turmeric', 'Lemon']
  },
  {
    id: '35',
    name: 'Upma',
    description: 'Savory semolina porridge with vegetables',
    price: 99,
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&h=300&fit=crop',
    category: 'breakfast',
    nutrition: { calories: 220, sugar: 2, fat: 6, protein: 6 },
    healthScore: 7,
    healthStatus: 'moderate',
    badges: ['South Indian', 'Healthy'],
    healthNote: 'Wholesome breakfast. Add more veggies for nutrition.',
    ingredients: ['Semolina', 'Onions', 'Green Chilies', 'Ginger', 'Curry Leaves', 'Mustard Seeds', 'Cashews', 'Mixed Vegetables']
  },
  {
    id: '36',
    name: 'Spring Rolls',
    description: 'Crispy rolls filled with mixed vegetables',
    price: 149,
    image: 'https://images.unsplash.com/photo-1548507200-e5de8dd23b51?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 280, sugar: 4, fat: 16, protein: 6 },
    healthScore: 5,
    healthStatus: 'moderate',
    badges: ['Indo-Chinese', 'Crispy'],
    healthNote: 'Deep fried appetizer. Baked version is healthier.',
    ingredients: ['Spring Roll Sheets', 'Cabbage', 'Carrots', 'Bean Sprouts', 'Mushrooms', 'Soy Sauce', 'Ginger', 'Garlic']
  },
  {
    id: '37',
    name: 'Manchurian',
    description: 'Crispy vegetable balls in spicy Indo-Chinese sauce',
    price: 189,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 320, sugar: 8, fat: 18, protein: 8 },
    healthScore: 4,
    healthStatus: 'high-risk',
    badges: ['Indo-Chinese', 'Spicy'],
    healthNote: 'Deep fried with MSG. Occasional indulgence only.',
    ingredients: ['Cabbage', 'Carrots', 'Corn Flour', 'Soy Sauce', 'Chili Sauce', 'Vinegar', 'Garlic', 'Ginger', 'Spring Onions']
  },
  {
    id: '38',
    name: 'Butter Chicken',
    description: 'Tender chicken in rich creamy tomato gravy',
    price: 329,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 490, sugar: 6, fat: 32, protein: 28 },
    healthScore: 5,
    healthStatus: 'moderate',
    badges: ['North Indian', 'Creamy'],
    healthNote: 'High in fat from butter and cream. Rich in protein.',
    ingredients: ['Chicken', 'Butter', 'Cream', 'Tomatoes', 'Cashews', 'Ginger', 'Garlic', 'Garam Masala', 'Kasuri Methi']
  },
  {
    id: '39',
    name: 'Rajma Chawal',
    description: 'Kidney bean curry served with steamed rice',
    price: 189,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 420, sugar: 4, fat: 10, protein: 16 },
    healthScore: 8,
    healthStatus: 'safe',
    badges: ['High Fiber', 'Vegetarian'],
    healthNote: 'Complete protein when combined with rice. High in fiber.',
    ingredients: ['Kidney Beans', 'Basmati Rice', 'Onions', 'Tomatoes', 'Ginger', 'Garlic', 'Rajma Masala', 'Coriander']
  },
  {
    id: '40',
    name: 'Momos',
    description: 'Steamed dumplings with spicy chutney',
    price: 129,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 240, sugar: 2, fat: 8, protein: 10 },
    healthScore: 7,
    healthStatus: 'moderate',
    badges: ['Steamed', 'Tibetan'],
    healthNote: 'Steamed momos are healthy. Avoid fried versions.',
    ingredients: ['All-Purpose Flour', 'Cabbage', 'Carrots', 'Onions', 'Ginger', 'Garlic', 'Soy Sauce', 'Red Chili Chutney']
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
