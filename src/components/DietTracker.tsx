import React, { useState, useMemo } from 'react';
import { BarcodeProduct } from '../data/barcodeDatabase';

interface DietItem extends BarcodeProduct {
  quantity: number;
  addedAt: Date;
}

interface DietTrackerProps {
  items: DietItem[];
  onAddItem: (product: BarcodeProduct) => void;
  onRemoveItem: (barcode: string) => void;
  onUpdateQuantity: (barcode: string, quantity: number) => void;
  onClearAll: () => void;
}

const DietTracker: React.FC<DietTrackerProps> = ({ 
  items, 
  onAddItem, 
  onRemoveItem, 
  onUpdateQuantity, 
  onClearAll 
}) => {
  const [userProfile, setUserProfile] = useState({
    age: 25,
    gender: 'male' as 'male' | 'female',
    weight: 70, // kg
    height: 175, // cm
    activityLevel: 'moderate' as 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active',
    goal: 'maintain' as 'lose' | 'maintain' | 'gain'
  });

  // Calculate total nutrition
  const totalNutrition = useMemo(() => {
    return items.reduce((acc, item) => {
      const multiplier = item.quantity;
      return {
        calories: acc.calories + (item.nutrition.calories * multiplier),
        protein: acc.protein + (item.nutrition.protein * multiplier),
        carbohydrates: acc.carbohydrates + (item.nutrition.carbohydrates * multiplier),
        fat: acc.fat + (item.nutrition.fat * multiplier),
        fiber: acc.fiber + (item.nutrition.fiber * multiplier),
        sugar: acc.sugar + (item.nutrition.sugar * multiplier),
        sodium: acc.sodium + (item.nutrition.sodium * multiplier),
      };
    }, {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
    });
  }, [items]);

  // Calculate BMR and daily calorie needs
  const dailyNeeds = useMemo(() => {
    const { age, gender, weight, height, activityLevel, goal } = userProfile;
    
    // Calculate BMR using Mifflin-St Jeor equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Apply activity multiplier
    const activityMultipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };

    const tdee = bmr * activityMultipliers[activityLevel];

    // Apply goal adjustment
    const goalAdjustments = {
      'lose': -500, // 500 calorie deficit for weight loss
      'maintain': 0,
      'gain': 500 // 500 calorie surplus for weight gain
    };

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(tdee + goalAdjustments[goal]),
      protein: Math.round(weight * 1.6), // 1.6g per kg for active individuals
      fiber: 25, // 25g daily recommendation
      sodium: 2300, // 2300mg daily limit
      sugar: 50 // 50g daily limit for added sugars
    };
  }, [userProfile]);

  // Generate health recommendations
  const recommendations = useMemo(() => {
    const recs = [];
    const { calories, protein, fiber, sodium, sugar } = totalNutrition;
    const { targetCalories, protein: targetProtein, fiber: targetFiber, sodium: targetSodium, sugar: targetSugar } = dailyNeeds;

    // Calorie recommendations
    if (calories > targetCalories * 1.1) {
      recs.push({
        type: 'warning',
        title: 'High Calorie Intake',
        message: `You're consuming ${Math.round(calories - targetCalories)} calories more than your daily target. Consider reducing portion sizes or choosing lower-calorie options.`,
        icon: '🔥'
      });
    } else if (calories < targetCalories * 0.8) {
      recs.push({
        type: 'warning',
        title: 'Low Calorie Intake',
        message: `You're consuming ${Math.round(targetCalories - calories)} calories less than your daily target. Consider adding more nutrient-dense foods.`,
        icon: '⚠️'
      });
    } else {
      recs.push({
        type: 'success',
        title: 'Good Calorie Balance',
        message: 'Your calorie intake is well-balanced with your daily target.',
        icon: '✅'
      });
    }

    // Protein recommendations
    if (protein < targetProtein * 0.8) {
      recs.push({
        type: 'warning',
        title: 'Low Protein Intake',
        message: `You need ${Math.round(targetProtein - protein)}g more protein. Add lean meats, eggs, dairy, or legumes to your diet.`,
        icon: '🥩'
      });
    } else if (protein > targetProtein * 1.5) {
      recs.push({
        type: 'info',
        title: 'High Protein Intake',
        message: 'Your protein intake is high. This is generally safe for active individuals.',
        icon: '💪'
      });
    }

    // Fiber recommendations
    if (fiber < targetFiber) {
      recs.push({
        type: 'warning',
        title: 'Low Fiber Intake',
        message: `You need ${Math.round(targetFiber - fiber)}g more fiber. Add more fruits, vegetables, and whole grains.`,
        icon: '🥬'
      });
    }

    // Sodium recommendations
    if (sodium > targetSodium) {
      recs.push({
        type: 'warning',
        title: 'High Sodium Intake',
        message: `Your sodium intake is ${Math.round(sodium - targetSodium)}mg above the daily limit. Choose low-sodium options and reduce processed foods.`,
        icon: '🧂'
      });
    }

    // Sugar recommendations
    if (sugar > targetSugar) {
      recs.push({
        type: 'warning',
        title: 'High Sugar Intake',
        message: `Your sugar intake is ${Math.round(sugar - targetSugar)}g above the daily limit. Reduce sugary drinks and snacks.`,
        icon: '🍭'
      });
    }

    return recs;
  }, [totalNutrition, dailyNeeds]);

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Personalized Diet Tracker</h2>
          <button
            onClick={onClearAll}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl font-semibold transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* User Profile */}
        <div className="mb-6 bg-blue-50 rounded-2xl p-4">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Your Profile</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
              <input
                type="number"
                value={userProfile.age}
                onChange={(e) => setUserProfile({...userProfile, age: parseInt(e.target.value) || 25})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <select
                value={userProfile.gender}
                onChange={(e) => setUserProfile({...userProfile, gender: e.target.value as 'male' | 'female'})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={userProfile.weight}
                onChange={(e) => setUserProfile({...userProfile, weight: parseInt(e.target.value) || 70})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Height (cm)</label>
              <input
                type="number"
                value={userProfile.height}
                onChange={(e) => setUserProfile({...userProfile, height: parseInt(e.target.value) || 175})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Activity</label>
              <select
                value={userProfile.activityLevel}
                onChange={(e) => setUserProfile({...userProfile, activityLevel: e.target.value as any})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
                <option value="very-active">Very Active</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Goal</label>
              <select
                value={userProfile.goal}
                onChange={(e) => setUserProfile({...userProfile, goal: e.target.value as any})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              >
                <option value="lose">Lose Weight</option>
                <option value="maintain">Maintain</option>
                <option value="gain">Gain Weight</option>
              </select>
            </div>
          </div>
        </div>

        {/* Daily Needs Summary */}
        <div className="mb-6 bg-purple-50 rounded-2xl p-4">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Daily Targets</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{dailyNeeds.targetCalories}</div>
              <div className="text-xs text-slate-600">Calories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{dailyNeeds.protein}g</div>
              <div className="text-xs text-slate-600">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{dailyNeeds.fiber}g</div>
              <div className="text-xs text-slate-600">Fiber</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{dailyNeeds.sodium}mg</div>
              <div className="text-xs text-slate-600">Sodium</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{dailyNeeds.sugar}g</div>
              <div className="text-xs text-slate-600">Sugar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{dailyNeeds.bmr}</div>
              <div className="text-xs text-slate-600">BMR</div>
            </div>
          </div>
        </div>

        {/* Current Intake */}
        <div className="mb-6 bg-orange-50 rounded-2xl p-4">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Current Intake</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${totalNutrition.calories > dailyNeeds.targetCalories ? 'text-red-600' : 'text-green-600'}`}>
                {Math.round(totalNutrition.calories)}
              </div>
              <div className="text-xs text-slate-600">Calories</div>
              <div className="text-xs text-slate-500">
                {Math.round(totalNutrition.calories - dailyNeeds.targetCalories)} from target
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${totalNutrition.protein < dailyNeeds.protein ? 'text-red-600' : 'text-green-600'}`}>
                {Math.round(totalNutrition.protein)}g
              </div>
              <div className="text-xs text-slate-600">Protein</div>
              <div className="text-xs text-slate-500">
                {Math.round(totalNutrition.protein - dailyNeeds.protein)}g from target
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${totalNutrition.fiber < dailyNeeds.fiber ? 'text-red-600' : 'text-green-600'}`}>
                {Math.round(totalNutrition.fiber)}g
              </div>
              <div className="text-xs text-slate-600">Fiber</div>
              <div className="text-xs text-slate-500">
                {Math.round(totalNutrition.fiber - dailyNeeds.fiber)}g from target
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${totalNutrition.sodium > dailyNeeds.sodium ? 'text-red-600' : 'text-green-600'}`}>
                {Math.round(totalNutrition.sodium)}mg
              </div>
              <div className="text-xs text-slate-600">Sodium</div>
              <div className="text-xs text-slate-500">
                {Math.round(totalNutrition.sodium - dailyNeeds.sodium)}mg from limit
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${totalNutrition.sugar > dailyNeeds.sugar ? 'text-red-600' : 'text-green-600'}`}>
                {Math.round(totalNutrition.sugar)}g
              </div>
              <div className="text-xs text-slate-600">Sugar</div>
              <div className="text-xs text-slate-500">
                {Math.round(totalNutrition.sugar - dailyNeeds.sugar)}g from limit
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </div>
              <div className="text-xs text-slate-600">Items</div>
            </div>
          </div>
        </div>

        {/* Health Recommendations */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Health Recommendations</h3>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl border-l-4 ${
                  rec.type === 'success' ? 'bg-green-50 border-green-500' :
                  rec.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{rec.icon}</div>
                  <div>
                    <div className="font-semibold text-slate-900">{rec.title}</div>
                    <div className="text-sm text-slate-700 mt-1">{rec.message}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diet Items */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Diet Items</h3>
          {items.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <div className="text-4xl mb-2">🍽</div>
              <p>No items added yet. Search for products and add them to your diet tracker.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.barcode} className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1546069901-b9f581a1996d?w=300&h=200&fit=crop'}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">{item.name}</div>
                    <div className="text-sm text-slate-600">{item.brand} • {item.category}</div>
                    <div className="text-sm text-slate-700">
                      {Math.round(item.nutrition.calories * item.quantity)} cal • 
                      {Math.round(item.nutrition.protein * item.quantity)}g protein
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.barcode, parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                    <button
                      onClick={() => onRemoveItem(item.barcode)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietTracker;
