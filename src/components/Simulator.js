import React, { Component } from 'react';

import './Simulator.scss';

import UnitSelector from './unit-selector/UnitSelector.js';
import SimulationResults from './SimulationResults.js';
import BattlePreview from './BattlePreview.js';
import Footer from './Footer.js';
import unitConfig from '../lib/unit-config.js';
import simulate from '../lib/simulate.js';
import { ATTACKER_SIDE,
         DEFENDER_SIDE,
         OrderOfBattle } from '../lib/order-of-battle.js';

function calcChance(simulation) {
  return simulation.results.filter(r => r.win).length / simulation.n;
}

class Simulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulation: null,
      units: new OrderOfBattle(unitConfig)
    };
  }

  handleSelectorUpdate(side, unitKey, delta) {
    let currentCount = this.state.units.unitCount(side, unitKey);
    this.setState((state, props) => ({
      units: state.units.setUnitCount(side, unitKey, currentCount + delta),
      simulation: null // Clear simulation results since units have changed
    }));
  }

  handleUnitSummaryClear(side) {
    this.setState((state, props) => ({
      units: state.units.clear(side)
    }));
  }

  handleSimulateClick() {
    this.setState({
      simulation: 'foo'
    });
  }

  getClasses() {
    if (this.state.simulation) {
      return "Simulator simulation";
    }
    else {
      return "Simulator selection";
    }
  }

  render() {
    let mainItem;
    if (this.state.simulation) {
      mainItem = (
        <SimulationResults simulation={this.state.simulation} />
      );
    }
    else {
      mainItem = (
        <BattlePreview
          units={this.state.units}
          onClear={(side) => this.handleUnitSummaryClear(side)}
          onSimulateClick={() => this.handleSimulateClick()}
        />
      );
    }

    return (
      <div className={this.getClasses()}>
        <UnitSelector
          side={ATTACKER_SIDE}
          units={this.state.units}
          onUpdate={(unitKey, delta) => (
            this.handleSelectorUpdate(ATTACKER_SIDE, unitKey, delta)
          )}
        />
        <UnitSelector
          side={DEFENDER_SIDE}
          units={this.state.units}
          onUpdate={(unitKey, delta) => (
            this.handleSelectorUpdate(DEFENDER_SIDE, unitKey, delta)
          )}
        />
        <main>
          {mainItem}
          <Footer />
        </main>
      </div>
    );
  }
}

export default Simulator;
