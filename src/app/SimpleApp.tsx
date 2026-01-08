import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom, #4b1e63, #2d1549, #1a032a)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '72px', fontWeight: 'bold', marginBottom: '20px' }}>GAIN</h1>
      <p style={{ fontSize: '24px', marginBottom: '40px', textAlign: 'center' }}>
        Your Personal Fitness Revolution
      </p>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button style={{
          padding: '16px 32px',
          fontSize: '20px',
          background: 'linear-gradient(to right, #ff25d3, #8a38f5)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Start Your Journey
        </button>
        
        <button style={{
          padding: '16px 32px',
          fontSize: '20px',
          background: 'transparent',
          color: 'white',
          border: '2px solid rgba(255,255,255,0.3)',
          borderRadius: '50px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Learn More
        </button>
        
        <button style={{
          padding: '16px 32px',
          fontSize: '20px',
          background: 'transparent',
          color: '#b388ff',
          border: '2px solid rgba(179, 136, 255, 0.5)',
          borderRadius: '50px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Join Preorder List
        </button>
      </div>
      
      <div style={{ 
        position: 'absolute', 
        bottom: '40px', 
        animation: 'bounce 2s infinite' 
      }}>
        <div style={{
          width: '24px',
          height: '40px',
          border: '2px solid rgba(255,255,255,0.4)',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '4px',
            height: '12px',
            backgroundColor: 'rgba(255,255,255,0.6)',
            borderRadius: '2px',
            marginTop: '8px',
            animation: 'pulse 2s infinite'
          }}></div>
        </div>
      </div>
    </div>
  );
}

export default function SimpleApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
