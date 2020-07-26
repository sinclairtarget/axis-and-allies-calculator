import React, { Component } from 'react';
import './App.css';
import FreqPlot from './components/freq-plot.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello, World!</h1>
        <FreqPlot />
      </div>
    );
  }
}

export default App;
