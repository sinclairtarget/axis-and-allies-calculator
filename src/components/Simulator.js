import React, { Component } from 'react';

import './Simulator.scss';

import UnitSelector from './unit-selector/UnitSelector.js';
import SimulationResults from './SimulationResults.js';
import unitConfig from '../lib/unit-config.js';
import simulate from '../lib/simulate.js';

function calcChance(simulation) {
  return simulation.results.filter(r => r.win).length / simulation.n;
}

class Simulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulation: null
    };
  }

  render() {
    return (
      <div className="Simulator">
        <UnitSelector role="attack" units={unitConfig} />
        <UnitSelector role="defense" units={unitConfig} />
        <SimulationResults />
      </div>
    );
  }
}

export default Simulator;
