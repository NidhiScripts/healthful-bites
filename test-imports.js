// Test file to check if imports work
console.log('Testing imports...');

try {
  const { foodCategories } = require('./src/data/brandComparisonData.ts');
  console.log('✅ brandComparisonData imported successfully');
} catch (error) {
  console.error('❌ Error importing brandComparisonData:', error.message);
}

try {
  const { compareProducts } = require('./src/utils/comparisonUtils.ts');
  console.log('✅ comparisonUtils imported successfully');
} catch (error) {
  console.error('❌ Error importing comparisonUtils:', error.message);
}

try {
  const { Product } = require('./src/types/food.ts');
  console.log('✅ food types imported successfully');
} catch (error) {
  console.error('❌ Error importing food types:', error.message);
}
