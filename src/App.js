import React, { Component } from 'react';

import './App.css';

import Simulator from './components/Simulator.js';

function App(props) {
  return (
    <div className="App">
      <header>
        <h3 className="title">Axis and Allies Battle Simulator</h3>
      </header>
      <Simulator />
    </div>
  );
}

export default App;
