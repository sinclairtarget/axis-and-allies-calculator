import React, { Component } from 'react';

import './Simulator.css';

import UnitSelector from './UnitSelector.js';
import SimulationResults from './SimulationResults.js';
import unitConfig from '../lib/unit-config.js';
import simulate from '../lib/simulate.js';

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

class Simulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulation: simulate(atk, def, unitConfig, 10000)
    };
  }

  render() {
    return (
      <div className="Simulator">
        <UnitSelector role="attack" />
        <UnitSelector role="defense" />
        <SimulationResults />
      </div>
    );
  }
}

export default Simulator;
