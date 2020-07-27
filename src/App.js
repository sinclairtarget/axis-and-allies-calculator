import React, { Component } from 'react';

import './App.css';
import FreqPlot from './components/freq-plot.js';
import unitConfig from './lib/unit-config.js';
import simulate from './lib/simulate.js';

let atk = {
  'infantry': 4,
  'artillery': 1,
  'fighter': 2,
  'bomber': 2
};

let def = {
  'infantry': 9,
  'tank': 1
};

function calcChance(simulation) {
  return simulation.results.filter(r => r.win).length / simulation.n;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulation: simulate(atk, def, unitConfig, 10000)
    };
  }

  render() {
    return (
      <div className="App">
        <h3>Attacker</h3>
        <p>{JSON.stringify(atk)}</p>
        <FreqPlot width="600"
                  height="400"
                  simulation={this.state.simulation}
                  vizKey="attackIPC" />
        <h3>Defender</h3>
        <p>{JSON.stringify(def)}</p>
        <FreqPlot width="600"
                  height="400"
                  simulation={this.state.simulation}
                  vizKey="defenseIPC" />
        <h3>Chance Attacker Takes Province</h3>
        <p>{calcChance(this.state.simulation)}</p>
      </div>
    );
  }
}

export default App;
