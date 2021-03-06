import React, { Component } from 'react';

import './App.scss';

import Simulator from './components/Simulator.js';

function App(props) {
  return (
    <div className="App">
      <header>
        <h3 className="title">Axis and Allies 1942 Battle Simulator</h3>
      </header>
      <Simulator />
    </div>
  );
}

export default App;
