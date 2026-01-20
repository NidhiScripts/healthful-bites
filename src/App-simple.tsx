import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Healthful Bites - Brand Comparison</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Simple Brand Comparison Test</h2>
        <p>This is a minimal version to test if the app loads properly.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>Maggi 2-Minute Noodles</h3>
          <p><strong>Brand:</strong> Maggi</p>
          <p><strong>Price:</strong> ₹15</p>
          <p><strong>Calories:</strong> 380</p>
          <p><strong>Protein:</strong> 8g</p>
          <p><strong>Carbs:</strong> 56g</p>
          <p><strong>Fat:</strong> 15g</p>
        </div>

        <div style={{ 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>Lays Classic Chips</h3>
          <p><strong>Brand:</strong> Lays</p>
          <p><strong>Price:</strong> ₹20</p>
          <p><strong>Calories:</strong> 160</p>
          <p><strong>Protein:</strong> 2g</p>
          <p><strong>Carbs:</strong> 15g</p>
          <p><strong>Fat:</strong> 10g</p>
        </div>
      </div>

      <div style={{ 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#e8f5e8'
      }}>
        <h3>✅ App Status: Working</h3>
        <p>If you can see this page, the basic React app is functioning correctly.</p>
        <p>The issue was likely with the complex routing and component imports.</p>
      </div>
    </div>
  );
}

export default App;
