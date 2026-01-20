import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Healthful Bites - Test</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        If you can see this, the basic React app is working.
      </p>
      <div style={{ 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2>App Status Check:</h2>
        <ul>
          <li>✅ React is rendering</li>
          <li>✅ Basic styling works</li>
          <li>🔧 Loading components...</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
