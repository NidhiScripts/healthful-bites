# DSA Concepts → Features & Algorithms Mapping

## 🎯 **Feature-Based DSA Mapping**

### **1. PRODUCT SEARCH & FILTERING**
**Feature**: Search products by name, brand, category
**DSA Concepts Used**:
- **Linear Search** - `O(n)` time complexity
  - Location: `src/data/barcodeDatabase.ts:300-307`
  - Algorithm: `barcodeDatabase.filter(p => p.name.toLowerCase().includes(cleanQuery))`
- **String Manipulation** - `O(n)` time complexity
  - Location: `src/data/barcodeDatabase.ts:302-305`
  - Algorithm: Case-insensitive string matching with `.toLowerCase()` and `.includes()`
- **Array Filter** - `O(n)` time complexity
  - Location: `src/App-working-clean.tsx:290-294`
  - Algorithm: `mockProducts.filter(p => p.category === selectedCategory)`

### **2. BARCODE SCANNING**
**Feature**: Scan product barcodes for instant lookup
**DSA Concepts Used**:
- **Hashing (Object Lookup)** - `O(1)` average time complexity
  - Location: `src/data/barcodeDatabase.ts:284`
  - Algorithm: `barcodeDatabase.find(p => p.barcode === cleanBarcode)`
- **String Normalization** - `O(n)` time complexity
  - Location: `src/data/barcodeDatabase.ts:281`
  - Algorithm: `barcode.replace(/[\s-]/g, '').toUpperCase()`
- **Fallback Search** - `O(n)` time complexity
  - Location: `src/data/barcodeDatabase.ts:287-288`
  - Algorithm: Partial barcode matching with `.includes()`

### **3. PRODUCT COMPARISON**
**Feature**: Compare multiple products side-by-side
**DSA Concepts Used**:
- **Sorting Algorithm** - `O(n log n)` time complexity
  - Location: `src/utils/comparison.ts:72-74`
  - Algorithm: `.sort((a, b) => b.similarityScore - a.similarityScore)`
- **Array Reduce** - `O(n)` time complexity
  - Location: `src/utils/comparisonUtils.ts:112-117`
  - Algorithm: Find best product for diabetics using reduction
- **Mathematical Scoring** - `O(n)` time complexity
  - Location: `src/utils/comparison.ts:77-97`
  - Algorithm: Nutritional similarity calculation with weighted scoring

### **4. DIET TRACKER & NUTRITION GOALS**
**Feature**: Personalized nutrition tracking with BMR/TDEE calculations
**DSA Concepts Used**:
- **Mathematical Algorithms** - `O(1)` time complexity
  - Location: `src/components/DietTracker.tsx:62-67`
  - Algorithm: Mifflin-St Jeor equation for BMR calculation
- **Hash Table Lookup** - `O(1)` time complexity
  - Location: `src/components/DietTracker.tsx:70-76`
  - Algorithm: Activity multiplier lookup using object keys
- **Conditional Logic** - `O(1)` time complexity
  - Location: `src/components/DietTracker.tsx:81-85`
  - Algorithm: Goal-based calorie adjustments with if-else chains

### **5. HEALTH SCORING SYSTEM**
**Feature**: Calculate health scores for products
**DSA Concepts Used**:
- **Multi-level Conditionals** - `O(1)` time complexity
  - Location: `src/utils/comparisonUtils.ts:7-29`
  - Algorithm: Tiered scoring system with if-else if-else chains
- **Boundary Checking** - `O(1)` time complexity
  - Location: `src/utils/comparisonUtils.ts:31`
  - Algorithm: `Math.max(1, Math.min(10, score))` for score clamping
- **Object Property Access** - `O(1)` time complexity
  - Location: `src/utils/comparisonUtils.ts:56`
  - Algorithm: `Object.values(product.allergens).filter(Boolean).length`

### **6. KEYBOARD NAVIGATION**
**Feature**: Navigate search results with arrow keys
**DSA Concepts Used**:
- **Circular Array Navigation** - `O(1)` time complexity
  - Location: `src/components/ProductSearch.tsx:52,56`
  - Algorithm: `(prev + 1) % searchResults.length` for wraparound
- **Switch-Case Logic** - `O(1)` time complexity
  - Location: `src/components/ProductSearch.tsx:49-67`
  - Algorithm: Keyboard event handling with switch statement
- **Boundary Checking** - `O(1)` time complexity
  - Location: `src/components/ProductSearch.tsx:60-61`
  - Algorithm: Array bounds validation for selected index

### **7. BRAND ANALYSIS & INSIGHTS**
**Feature**: Analyze brands and generate nutritional insights
**DSA Concepts Used**:
- **Set-based Deduplication** - `O(n)` time complexity
  - Location: `src/utils/comparison.ts:162`
  - Algorithm: `[...new Set(items.map(item => item.brand))]` for unique brands
- **Array Map & Reduce** - `O(n)` time complexity
  - Location: `src/utils/comparison.ts:166-169`
  - Algorithm: Brand aggregation with map and reduce operations
- **Min/Max Finding** - `O(n)` time complexity
  - Location: `src/utils/comparison.ts:147-149`
  - Algorithm: `Math.max(...prices)` and `Math.min(...prices)` for price range

### **8. DATA VISUALIZATION**
**Feature**: Display nutritional data in charts
**DSA Concepts Used**:
- **Array Map** - `O(n)` time complexity
  - Location: `src/App-working-clean.tsx:296-304`
  - Algorithm: Transform product data for chart visualization
- **Memoization** - `O(1)` after initial computation
  - Location: `src/App-working-clean.tsx:263`
  - Algorithm: `useMemo(() => Date.now(), [])` for performance optimization

### **9. PRODUCT RECOMMENDATIONS**
**Feature**: Suggest similar products to users
**DSA Concepts Used**:
- **Similarity Algorithm** - `O(n)` time complexity
  - Location: `src/utils/comparison.ts:77-97`
  - Algorithm: Weighted nutritional similarity calculation
- **Array Intersection** - `O(n*m)` time complexity
  - Location: `src/utils/comparison.ts:49`
  - Algorithm: `item.tags.filter(tag => currentItem.tags.includes(tag))`
- **Percentage Calculation** - `O(1)` time complexity
  - Location: `src/utils/comparison.ts:34-36`
  - Algorithm: Price difference percentage for similarity scoring

### **10. USER INTERFACE OPTIMIZATION**
**Feature**: Smooth and responsive UI interactions
**DSA Concepts Used**:
- **Memoization** - Space-time tradeoff
  - Location: `src/App-working-clean.tsx:265-267`
  - Algorithm: Cached category list with `useMemo`
- **Event Debouncing** - `O(1)` time complexity
  - Location: `src/components/ProductSearch.tsx:26-35`
  - Algorithm: Click outside detection with event listener management
- **Lazy Evaluation** - `O(1)` when cached
  - Location: Multiple locations with `useMemo`
  - Algorithm: Prevent unnecessary recalculations of expensive operations

---

## 📊 **Algorithm Summary by Feature**

| Feature | Primary DSA Concept | Time Complexity | Location |
|---------|-------------------|-----------------|----------|
| Product Search | Linear Search + String Manipulation | O(n*m) | barcodeDatabase.ts:300 |
| Barcode Scanning | Hash Lookup + String Normalization | O(1) avg, O(n) worst | barcodeDatabase.ts:284 |
| Product Comparison | Sorting + Reduce | O(n log n) | comparison.ts:72 |
| Diet Tracking | Mathematical Algorithms | O(1) | DietTracker.tsx:62 |
| Health Scoring | Multi-level Conditionals | O(1) | comparisonUtils.ts:7 |
| Keyboard Navigation | Circular Array + Switch-Case | O(1) | ProductSearch.tsx:49 |
| Brand Analysis | Set Deduplication + Map/Reduce | O(n) | comparison.ts:162 |
| Data Visualization | Array Map + Memoization | O(n) | App-working-clean.tsx:296 |
| Recommendations | Similarity Algorithm | O(n) | comparison.ts:77 |
| UI Optimization | Memoization + Debouncing | O(1) cached | Multiple locations |

---

## 🎯 **Key Insights**

### **Most Used DSA Concepts**:
1. **Array Operations** (Map, Filter, Reduce) - Used in 8+ features
2. **Hashing/Object Lookup** - Used in 5+ features for O(1) access
3. **Mathematical Algorithms** - Used in 4+ features for calculations
4. **Conditional Logic** - Used in 6+ features for decision making
5. **String Manipulation** - Used in 3+ features for text processing

### **Performance Optimizations**:
- **Memoization** prevents unnecessary recalculations
- **Hash-based lookups** provide O(1) average access time
- **Set operations** enable efficient deduplication
- **Circular navigation** provides seamless user experience

### **Real-World Applications**:
- **Scientific formulas** for health calculations (BMR/TDEE)
- **Search algorithms** for product discovery
- **Statistical analysis** for brand comparisons
- **Similarity algorithms** for recommendations

---

## 🚀 **Advanced DSA Opportunities**

### **Missing Heap Implementation**:
- **Priority Queue** for top-K healthiest products
- **Dynamic Rankings** for real-time score updates
- **Performance Improvement** from O(n log n) to O(n + k log n)

### **Potential Graph Algorithms**:
- **Product Relationship Graph** for advanced recommendations
- **Category Hierarchy** for nested navigation
- **User Preference Graph** for personalized suggestions

---

*Generated: Complete DSA Feature Mapping for NutriDSA Project*
*Total Features Mapped: 10*
*Total DSA Concepts: 25+*
*Algorithm Types: Array, Search, Sort, Hash, Mathematical, Control Flow*