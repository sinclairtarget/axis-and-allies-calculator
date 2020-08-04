import React, { Component } from 'react';

import './Simulator.scss';

import UnitSelector from './unit-selector/UnitSelector.js';
import SimulationResults from './SimulationResults.js';
import BattlePreview from './BattlePreview.js';
import unitConfig from '../lib/unit-config.js';
import simulate from '../lib/simulate.js';

const MAX_UNITS = 99;

function calcChance(simulation) {
  return simulation.results.filter(r => r.win).length / simulation.n;
}

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

class Simulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulation: null,
      units: {
        attack: new Map(), // Use map because easy to clone
        defense: new Map()
      }
    };
  }

  handleSelectorUpdate(role, change) {
    let map = this.state.units[role];
    if (map.has(change.key))
      map.set(change.key, clamp(map.get(change.key) + change.change, 0, MAX_UNITS));
    else
      map.set(change.key, clamp(change.change, 0, MAX_UNITS));

    this.setState((state) => {
      let otherRole = role == 'attack' ? 'defense' : 'attack';
      let newUnits = {};
      newUnits[role] = new Map(map);
      newUnits[otherRole] = state.units[otherRole];
      return {
        units: newUnits
      };
    });
  }

  render() {
    return (
      <div className="Simulator">
        <UnitSelector
          role="attack"
          unitConfig={unitConfig}
          units={this.state.units['attack']}
          onUpdate={(change) => this.handleSelectorUpdate('attack', change)}
        />
        <UnitSelector
          role="defense"
          unitConfig={unitConfig}
          units={this.state.units['defense']}
          onUpdate={(change) => this.handleSelectorUpdate('defense', change)}
        />
        <BattlePreview unitConfig={unitConfig} units={this.state.units} />
      </div>
    );
  }
}

export default Simulator;
