import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <span style={{ opacity: 0.25 }}>
              <button className="btn" disabled style={{ pointerEvents: 'none' }}>Classic</button>
            </span>
          </div>
        </div>
      </nav>
      <main>
        <div className="container">
          <TicTacToeClassic />
        </div>
      </main>
    </div>
  );
}

export default App;