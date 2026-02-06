import masalaDosaImg from "@/assets/foods/masala-dosa.jpg";
import idliImg from "@/assets/foods/idli.jpg";
import pohaImg from "@/assets/foods/poha.jpg";
import upmaImg from "@/assets/foods/upma.jpg";
import meduVadaImg from "@/assets/foods/medu-vada.jpg";
import palakPaneerImg from "@/assets/foods/palak-paneer.jpg";
import rajmaChawalImg from "@/assets/foods/rajma-chawal.jpg";
import kadhaiPaneerImg from "@/assets/foods/kadhai-paneer.jpg";
import choleBhatureImg from "@/assets/foods/chole-bhature.jpg";
import dhoklaImg from "@/assets/foods/dhokla.jpg";
import dalTadkaImg from "@/assets/foods/dal-tadka.jpg";
import bhelPuriImg from "@/assets/foods/bhel-puri_user.jpg";
import paniPuriImg from "@/assets/foods/pani-puri_user.jpg";
import alooTikkiImg from "@/assets/foods/aloo-tikki_user.jpg";
import dahiPuriImg from "@/assets/foods/dahi-puri_user.jpg";
import springRollsImg from "@/assets/foods/spring-rolls.jpg";
import kachoriImg from "@/assets/foods/kachori_user.jpg";
import vadaPavImg from "@/assets/foods/vada-pav.jpg";
import amulButterImg from "@/assets/foods/amul-butter.png";
import hideSeekImg from "@/assets/foods/hide-seek.png";
import kurkureImg from "@/assets/foods/kurkure.png";
import maggiImg from "@/assets/foods/maggi-noodles.png";
import tropicanaImg from "@/assets/foods/tropicana.png";

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
    // Extended fields for scanner
    carbohydrates?: number;
    sodium?: number;
    fiber?: number;
  };
  healthScore: number;
  healthStatus: 'safe' | 'moderate' | 'high-risk';
  badges: string[];
  healthNote: string;
  ingredients: string[];
  // Extended fields for scanner
  brand?: string;
  servingSize?: string;
  allergens?: string[];
}

export const foodItems: FoodItem[] = [
  // Breakfast Items
  {
    id: '1',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato masala',
    price: 149,
    image: masalaDosaImg,
    category: 'breakfast',
    nutrition: { calories: 350, sugar: 4, fat: 12, protein: 8 },
    healthScore: 7,
    healthStatus: 'moderate',
    badges: ['Vegetarian', 'South Indian'],
    healthNote: 'Fermented batter aids digestion. Good source of carbs for energy.',
    ingredients: ['Rice Batter', 'Urad Dal', 'Potatoes', 'Onions', 'Mustard Seeds', 'Curry Leaves', 'Green Chilies', 'Turmeric']
  },
  {
    id: '2',
    name: 'Idli Sambhar',
    description: 'Steamed rice cakes with lentil vegetable stew',
    price: 129,
    image: idliImg,
    category: 'breakfast',
    nutrition: { calories: 180, sugar: 4, fat: 2, protein: 8 },
    healthScore: 9,
    healthStatus: 'safe',
    badges: ['Low Fat', 'South Indian'],
    healthNote: 'Light and nutritious. Fermented food great for digestion.',
    ingredients: ['Rice', 'Urad Dal', 'Toor Dal', 'Mixed Vegetables', 'Tamarind', 'Curry Leaves', 'Mustard Seeds', 'Sambhar Powder']
  },
  {
    id: '3',
    name: 'Poha',
    description: 'Flattened rice tempered with peanuts and spices',
    price: 89,
    image: pohaImg,
    category: 'breakfast',
    nutrition: { calories: 250, sugar: 2, fat: 8, protein: 6 },
    healthScore: 7,
    healthStatus: 'moderate',
    badges: ['Light Meal', 'Gujarati'],
    healthNote: 'Light and easy to digest. Good breakfast option.',
    ingredients: ['Flattened Rice', 'Peanuts', 'Onions', 'Green Chilies', 'Mustard Seeds', 'Curry Leaves', 'Turmeric', 'Lemon']
  },
  {
    id: '4',
    name: 'Upma',
    description: 'Savory semolina porridge with vegetables',
    price: 99,
    image: upmaImg,
    category: 'breakfast',
    nutrition: { calories: 220, sugar: 2, fat: 6, protein: 6 },
    healthScore: 7,
    healthStatus: 'moderate',
    badges: ['South Indian', 'Healthy'],
    healthNote: 'Wholesome breakfast. Add more veggies for nutrition.',
    ingredients: ['Semolina', 'Onions', 'Green Chilies', 'Ginger', 'Curry Leaves', 'Mustard Seeds', 'Cashews', 'Mixed Vegetables']
  },
  {
    id: '5',
    name: 'Aloo Paratha',
    description: 'Stuffed potato flatbread served with curd and pickle',
    price: 119,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    category: 'breakfast',
    nutrition: { calories: 320, sugar: 2, fat: 14, protein: 8 },
    healthScore: 6,
    healthStatus: 'moderate',
    badges: ['North Indian', 'Filling'],
    healthNote: 'Good source of carbs. Watch the ghee quantity.',
    ingredients: ['Wheat Flour', 'Potatoes', 'Green Chilies', 'Coriander', 'Cumin', 'Ghee', 'Curd', 'Pickle']
  },
  {
    id: '6',
    name: 'Medu Vada',
    description: 'Crispy lentil doughnuts served with chutney',
    price: 99,
    image: meduVadaImg,
    category: 'breakfast',
    nutrition: { calories: 280, sugar: 2, fat: 16, protein: 10 },
    healthScore: 5,
    healthStatus: 'moderate',
    badges: ['South Indian', 'Protein Rich'],
    healthNote: 'Deep fried but rich in protein from lentils.',
    ingredients: ['Urad Dal', 'Ginger', 'Green Chilies', 'Curry Leaves', 'Black Pepper', 'Coconut Chutney', 'Sambhar']
  },
  // Lunch Items
  {
    id: '7',
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
    id: '8',
    name: 'Dal Tadka',
    description: 'Yellow lentils tempered with aromatic spices',
    price: 179,
    image: dalTadkaImg,
    category: 'lunch',
    nutrition: { calories: 220, sugar: 3, fat: 8, protein: 14 },
    healthScore: 9,
    healthStatus: 'safe',
    badges: ['High Protein', 'Vegan'],
    healthNote: 'Excellent plant-based protein. Rich in fiber and nutrients.',
    ingredients: ['Yellow Lentils', 'Tomatoes', 'Onions', 'Garlic', 'Cumin', 'Turmeric', 'Red Chilies', 'Ghee', 'Coriander']
  },
  {
    id: '9',
    name: 'Chole Bhature',
    description: 'Spiced chickpea curry with fluffy fried bread',
    price: 199,
    image: choleBhatureImg,
    category: 'lunch',
    nutrition: { calories: 580, sugar: 8, fat: 28, protein: 18 },
    healthScore: 4,
    healthStatus: 'high-risk',
    badges: ['Comfort Food', 'North Indian'],
    healthNote: 'High calorie traditional dish. Best enjoyed occasionally.',
    ingredients: ['Chickpeas', 'All-Purpose Flour', 'Onions', 'Tomatoes', 'Ginger', 'Garlic', 'Chole Masala', 'Yogurt']
  },
  {
    id: '10',
    name: 'Palak Paneer',
    description: 'Cottage cheese cubes in creamy spinach gravy',
    price: 259,
    image: palakPaneerImg,
    category: 'lunch',
    nutrition: { calories: 320, sugar: 4, fat: 22, protein: 18 },
    healthScore: 8,
    healthStatus: 'safe',
    badges: ['Iron Rich', 'Vegetarian'],
    healthNote: 'Iron-rich spinach with protein. Great for vegetarians.',
    ingredients: ['Paneer', 'Spinach', 'Onions', 'Tomatoes', 'Garlic', 'Ginger', 'Cream', 'Garam Masala', 'Cumin']
  },
  {
    id: '11',
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
    id: '12',
    name: 'Rajma Chawal',
    description: 'Kidney bean curry served with steamed rice',
    price: 189,
    image: rajmaChawalImg,
    category: 'lunch',
    nutrition: { calories: 420, sugar: 4, fat: 10, protein: 16 },
    healthScore: 8,
    healthStatus: 'safe',
    badges: ['High Fiber', 'Vegetarian'],
    healthNote: 'Complete protein when combined with rice. High in fiber.',
    ingredients: ['Kidney Beans', 'Basmati Rice', 'Onions', 'Tomatoes', 'Ginger', 'Garlic', 'Rajma Masala', 'Coriander']
  },
  {
    id: '13',
    name: 'Kadhai Paneer',
    description: 'Cottage cheese cooked with bell peppers and spices',
    price: 269,
    image: kadhaiPaneerImg,
    category: 'lunch',
    nutrition: { calories: 340, sugar: 5, fat: 24, protein: 16 },
    healthScore: 7,
    healthStatus: 'moderate',
    badges: ['Vegetarian', 'Spicy'],
    healthNote: 'Good protein source. Moderate fat content.',
    ingredients: ['Paneer', 'Bell Peppers', 'Onions', 'Tomatoes', 'Kadhai Masala', 'Coriander', 'Ginger', 'Green Chilies']
  },
  {
    id: '14',
    name: 'Veg Thali',
    description: 'Complete meal with dal, sabzi, roti, rice and more',
    price: 249,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 650, sugar: 8, fat: 18, protein: 20 },
    healthScore: 8,
    healthStatus: 'safe',
    badges: ['Complete Meal', 'Balanced'],
    healthNote: 'Well-balanced traditional meal with all nutrients.',
    ingredients: ['Dal', 'Mixed Vegetables', 'Roti', 'Rice', 'Raita', 'Pickle', 'Papad', 'Salad']
  },
  {
    id: '15',
    name: 'Burger Deluxe',
    description: 'Juicy patty with cheese, lettuce, and special sauce',
    price: 199,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'lunch',
    nutrition: { calories: 520, sugar: 8, fat: 28, protein: 24 },
    healthScore: 4,
    healthStatus: 'high-risk',
    badges: ['Comfort Food', 'Popular'],
    healthNote: 'High in fat and calories. Enjoy as an occasional treat.',
    ingredients: ['Burger Bun', 'Chicken Patty', 'Cheese Slice', 'Lettuce', 'Tomato', 'Onion', 'Mayo', 'Special Sauce']
  },
  // Snacks
  {
    id: '16',
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
    id: '17',
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
    id: '18',
    name: 'Vada Pav',
    description: 'Mumbai street food - spiced potato fritter in bread',
    price: 59,
    image: vadaPavImg,
    category: 'snacks',
    nutrition: { calories: 340, sugar: 4, fat: 18, protein: 6 },
    healthScore: 4,
    healthStatus: 'high-risk',
    badges: ['Street Food', 'Mumbai Special'],
    healthNote: 'Deep fried snack. High in carbs and fat.',
    ingredients: ['Pav Bread', 'Potato Vada', 'Gram Flour', 'Green Chutney', 'Tamarind Chutney', 'Garlic Chutney', 'Green Chilies']
  },
  {
    id: '19',
    name: 'Pani Puri',
    description: 'Crispy puris filled with tangy spiced water',
    price: 69,
    image: paniPuriImg,
    category: 'snacks',
    nutrition: { calories: 180, sugar: 6, fat: 8, protein: 4 },
    healthScore: 5,
    healthStatus: 'moderate',
    badges: ['Street Food', 'Tangy'],
    healthNote: 'Fun snack but ensure hygiene. Watch the spice level.',
    ingredients: ['Semolina Puris', 'Boiled Potatoes', 'Chickpeas', 'Tamarind Water', 'Mint Water', 'Chaat Masala', 'Onions']
  },
  {
    id: '20',
    name: 'Aloo Tikki',
    description: 'Crispy spiced potato patties with chutneys',
    price: 89,
    image: alooTikkiImg,
    category: 'snacks',
    nutrition: { calories: 220, sugar: 3, fat: 12, protein: 4 },
    healthScore: 5,
    healthStatus: 'moderate',
    badges: ['Street Food', 'Vegetarian'],
    healthNote: 'Pan-fried option healthier than deep fried.',
    ingredients: ['Potatoes', 'Green Peas', 'Corn Flour', 'Cumin', 'Coriander', 'Green Chutney', 'Tamarind Chutney', 'Yogurt']
  },
  {
    id: '21',
    name: 'Bhel Puri',
    description: 'Puffed rice mixed with veggies and tangy chutneys',
    price: 79,
    image: bhelPuriImg,
    category: 'snacks',
    nutrition: { calories: 160, sugar: 8, fat: 4, protein: 4 },
    healthScore: 6,
    healthStatus: 'moderate',
    badges: ['Low Calorie', 'Chaat'],
    healthNote: 'Light snack with fiber. Watch the sodium from chutneys.',
    ingredients: ['Puffed Rice', 'Sev', 'Onions', 'Tomatoes', 'Boiled Potatoes', 'Tamarind Chutney', 'Green Chutney', 'Chaat Masala']
  },
  {
    id: '22',
    name: 'Dhokla',
    description: 'Steamed savory gram flour cake from Gujarat',
    price: 99,
    image: dhoklaImg,
    category: 'snacks',
    nutrition: { calories: 140, sugar: 4, fat: 4, protein: 6 },
    healthScore: 8,
    healthStatus: 'safe',
    badges: ['Steamed', 'Low Fat'],
    healthNote: 'Steamed and fermented. Healthy snack option.',
    ingredients: ['Gram Flour', 'Yogurt', 'Ginger', 'Green Chilies', 'Mustard Seeds', 'Curry Leaves', 'Coconut', 'Coriander']
  },
  {
    id: '23',
    name: 'Spring Rolls',
    description: 'Crispy rolls filled with mixed vegetables',
    price: 149,
    image: springRollsImg,
    category: 'snacks',
    nutrition: { calories: 280, sugar: 4, fat: 16, protein: 6 },
    healthScore: 5,
    healthStatus: 'moderate',
    badges: ['Indo-Chinese', 'Crispy'],
    healthNote: 'Deep fried appetizer. Baked version is healthier.',
    ingredients: ['Spring Roll Sheets', 'Cabbage', 'Carrots', 'Bean Sprouts', 'Mushrooms', 'Soy Sauce', 'Ginger', 'Garlic']
  },
  {
    id: '24',
    name: 'Momos',
    description: 'Steamed dumplings with spicy chutney',
    price: 129,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 240, sugar: 2, fat: 8, protein: 10 },
    healthScore: 7,
    healthStatus: 'moderate',
    badges: ['Steamed', 'Popular'],
    healthNote: 'Steamed momos are healthy. Avoid fried versions.',
    ingredients: ['All-Purpose Flour', 'Cabbage', 'Carrots', 'Onions', 'Ginger', 'Garlic', 'Soy Sauce', 'Red Chili Chutney']
  },
  {
    id: '25',
    name: 'Crispy Fries',
    description: 'Golden potato fries with herbs and sea salt',
    price: 99,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 380, sugar: 1, fat: 22, protein: 4 },
    healthScore: 3,
    healthStatus: 'high-risk',
    badges: ['Comfort Food', 'Popular'],
    healthNote: 'High in saturated fat and calories. Consider healthier alternatives.',
    ingredients: ['Russet Potatoes', 'Vegetable Oil', 'Sea Salt', 'Rosemary', 'Garlic Powder', 'Paprika']
  },
  {
    id: '26',
    name: 'Kachori',
    description: 'Crispy fried pastry filled with spiced lentils',
    price: 59,
    image: kachoriImg,
    category: 'snacks',
    nutrition: { calories: 290, sugar: 3, fat: 18, protein: 6 },
    healthScore: 4,
    healthStatus: 'high-risk',
    badges: ['Street Food', 'Rajasthani'],
    healthNote: 'Deep fried snack. Rich but high in calories.',
    ingredients: ['All-Purpose Flour', 'Moong Dal', 'Urad Dal', 'Cumin', 'Fennel Seeds', 'Red Chili', 'Asafoetida', 'Oil']
  },
  {
    id: '27',
    name: 'Dahi Puri',
    description: 'Crispy puris topped with yogurt and chutneys',
    price: 79,
    image: dahiPuriImg,
    category: 'snacks',
    nutrition: { calories: 200, sugar: 10, fat: 8, protein: 6 },
    healthScore: 6,
    healthStatus: 'moderate',
    badges: ['Chaat', 'Refreshing'],
    healthNote: 'Contains probiotics from yogurt. Moderate calorie snack.',
    ingredients: ['Semolina Puris', 'Yogurt', 'Boiled Potatoes', 'Chickpeas', 'Tamarind Chutney', 'Green Chutney', 'Sev', 'Chaat Masala']
  },
  {
    id: '28',
    name: 'Chicken Tikka',
    description: 'Tender spiced chicken pieces grilled to perfection',
    price: 299,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    category: 'snacks',
    nutrition: { calories: 260, sugar: 2, fat: 12, protein: 28 },
    healthScore: 8,
    healthStatus: 'safe',
    badges: ['High Protein', 'Grilled'],
    healthNote: 'Excellent protein source. Grilled preparation is healthy.',
    ingredients: ['Chicken', 'Yogurt', 'Ginger Garlic Paste', 'Red Chili', 'Turmeric', 'Garam Masala', 'Lemon', 'Mustard Oil']
  },
  // Packed Products (Snacks)
  {
    id: 'maggi-2min',
    name: 'Maggi 2-Minute Noodles',
    brand: 'Maggi',
    category: 'snacks',
    description: 'Favorite Indian instant masala noodles',
    price: 15,
    image: maggiImg,
    nutrition: { calories: 380, sugar: 2, fat: 15, protein: 8, carbohydrates: 56, sodium: 850 },
    healthScore: 4,
    healthStatus: 'high-risk',
    badges: ['Instant', 'Popular'],
    healthNote: 'High in sodium and refined flour. Best consumed occasionally.',
    ingredients: ['Refined Wheat Flour', 'Palm Oil', 'Salt', 'Spices', 'Minerals']
  },
  {
    id: 'kurkure-masala',
    name: 'Kurkure Masala Munch',
    brand: 'Kurkure',
    category: 'snacks',
    description: 'Crunchy corn and rice meal snack with Indian spices',
    price: 20,
    image: "https://m.media-amazon.com/images/I/71LyKlizpuL._AC_UF894,1000_QL80_.jpg",
    nutrition: { calories: 270, sugar: 2, fat: 15, protein: 3, carbohydrates: 30, sodium: 600 },
    healthScore: 3,
    healthStatus: 'high-risk',
    badges: ['Crunchy', 'Spicy'],
    healthNote: 'High in fat and spices. Moderate portion size recommended.',
    ingredients: ['Rice Meal', 'Corn Meal', 'Gram Meal', 'Edible Vegetable Oil', 'Spices']
  },
  {
    id: 'hide-seek-cookies',
    name: 'Hide & Seek Biscuits',
    brand: 'Parle',
    category: 'snacks',
    description: 'Chocolate chip cookies for a rich chocolatey experience',
    price: 30,
    image: "http://themintleaves.com/cdn/shop/products/Parle-Hide-seek_7c34205a-0202-4777-83d3-5041c2884dfb_1200x1200.png?v=1619599543",
    nutrition: { calories: 480, sugar: 25, fat: 20, protein: 6, carbohydrates: 72, sodium: 250 },
    healthScore: 5,
    healthStatus: 'moderate',
    badges: ['Chocolate', 'Eggless'],
    healthNote: 'High in sugar and calories. Good for a quick treat.',
    ingredients: ['Wheat Flour', 'Chocolate Chips', 'Sugar', 'Vegetable Oil']
  },
  {
    id: 'amul-butter-100',
    name: 'Amul Pasteurised Butter',
    brand: 'Amul',
    category: 'breakfast',
    description: 'Authentic Indian butter made from fresh cream',
    price: 55,
    image: amulButterImg,
    nutrition: { calories: 720, sugar: 0, fat: 80, protein: 0, carbohydrates: 0, sodium: 800 },
    healthScore: 6,
    healthStatus: 'moderate',
    badges: ['Dairy', 'Legacy'],
    healthNote: 'Pure fat source. Limit daily consumption.',
    ingredients: ['Milk Fat', 'Salt', 'Milk Solids', 'Annatto Color']
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
