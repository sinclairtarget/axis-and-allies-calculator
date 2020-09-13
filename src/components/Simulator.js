import React, { Component } from 'react';

import './Simulator.scss';

import UnitSelector from './unit-selector/UnitSelector.js';
import SimulationReview from './simulation-review/SimulationReview.js';
import BattlePreview from './BattlePreview.js';
import Footer from './Footer.js';
import HelpModal from './HelpModal.js';
import unitConfig from '../lib/unit-config.js';
import simulateWorker from 'workerize-loader!../lib/simulate.js';
import SimulationResults from '../lib/simulation-results.js';
import { ATTACKER_SIDE,
         DEFENDER_SIDE,
         OrderOfBattle } from '../lib/order-of-battle.js';

const N = 10000;
const workerInstance = simulateWorker();

class Simulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulation: null,
      simulationResults: null,
      units: new OrderOfBattle(),
      options: {
        prioritizeConquest: true,
        oneRoundOnly: false
      },
      showingHelpModal: false
    };
  }

  handleSelectorUpdate(side, unitKey, delta) {
    let currentCount = this.state.units.unitCount(side, unitKey);
    this.setState((state, props) => ({
      units: state.units.setUnitCount(side, unitKey, currentCount + delta),
      simulationResults: null // Clear results since units have changed
    }));
  }

  handleUnitSummaryClear(side) {
    this.setState((state, props) => ({
      units: state.units.clear(side),
      simulationResults: null // Clear results since units have changed
    }));
  }

  handleSimulateClick() {
    this.setState((state, props) => {
      let promise =
        workerInstance.simulate(state.units.units, N, state.options)
                      .then(rawResults => {
        // Create simulation results obj here after getting data back from
        // the web worker
        let results = new SimulationResults(N, rawResults, state.units);

        this.setState({
          simulation: null,
          simulationResults: results,
          showingHelpModal: false
        });

        this.scrollTop();
      });

      return {
        simulation: promise // Current simulation-in-progress is saved
      };
    });
  }

  handleOptionToggle(optionName) {
    this.setState((state, props) => {
      let newValue = !state.options[optionName];
      return {
        options: {...state.options, [optionName]: newValue }
      };
    });
  }

  showHelpModal(shouldShow) {
    this.setState({
        showingHelpModal: shouldShow
    });

    if (shouldShow)
      this.scrollTop();
  }

  clearSimulationResults() {
    this.setState({
      simulationResults: null
    });

    this.scrollTop();
  }

  scrollTop() {
    window.scrollTo(0, 0); // For mobile devices
  }

  getClasses() {
    if (this.state.simulationResults) {
      return "Simulator simulation";
    }
    else {
      return "Simulator selection";
    }
  }

  renderHelpModal() {
    if (!this.state.showingHelpModal)
      return null;

    return (
      <HelpModal onExit={() => this.showHelpModal(false)} />
    );
  }

  render() {
    let mainItem;
    if (this.state.simulationResults) {
      mainItem = (
        <SimulationReview simulation={this.state.simulationResults}
                          onBack={() => this.clearSimulationResults()} />
      );
    }
    else {
      mainItem = (
        <BattlePreview
          units={this.state.units}
          simulationInProgress={this.state.simulation != null}
          options={this.state.options}
          onOptionToggle={(opName) => this.handleOptionToggle(opName)}
          onClear={(side) => this.handleUnitSummaryClear(side)}
          onSimulateClick={() => this.handleSimulateClick()}
          onHelpClick={() => this.showHelpModal(true)}
        />
      );
    }

    let helpModal = this.renderHelpModal();

    return (
      <div className={this.getClasses()}>
        <UnitSelector
          side={ATTACKER_SIDE}
          units={this.state.units}
          simulationInProgress={this.state.simulation != null}
          onUpdate={(unitKey, delta) => (
            this.handleSelectorUpdate(ATTACKER_SIDE, unitKey, delta)
          )}
          onClear={(side) => this.handleUnitSummaryClear(side)}
        />
        <UnitSelector
          side={DEFENDER_SIDE}
          units={this.state.units}
          simulationInProgress={this.state.simulation != null}
          onUpdate={(unitKey, delta) => (
            this.handleSelectorUpdate(DEFENDER_SIDE, unitKey, delta)
          )}
          onClear={(side) => this.handleUnitSummaryClear(side)}
        />
        <main ref={this.scrollRef}>
          <div className="inner-scroll-fix">
            <div className="center">
              {mainItem}
              <Footer />
            </div>
          </div>
        </main>
        {helpModal}
      </div>
    );
  }
}

export default Simulator;
