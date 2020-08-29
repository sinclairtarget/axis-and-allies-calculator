import React, { Component } from 'react';

import UnitSummaryPanel from './UnitSummaryPanel.js';
import { ATTACKER_SIDE, DEFENDER_SIDE } from '../../lib/order-of-battle.js';

import './UnitSummary.scss';

class UnitSummary extends Component {
  handleClear(side) {
    this.props.onClear(side);
  }

  render() {
    let props = this.props;

    return (
      <div className="UnitSummary">
        <UnitSummaryPanel side={ATTACKER_SIDE}
                          units={props.units}
                          simulationInProgress={props.simulationInProgress}
                          onClear={() => this.handleClear(ATTACKER_SIDE)} />
        <div className="vs-box">
          <h4 className="vs-title">vs</h4>
        </div>
        <UnitSummaryPanel side={DEFENDER_SIDE}
                          units={props.units}
                          simulationInProgress={props.simulationInProgress}
                          onClear={() => this.handleClear(DEFENDER_SIDE)} />
      </div>
    );
  }
}

export default UnitSummary;
