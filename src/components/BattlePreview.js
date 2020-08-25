import React, { Component } from 'react';

import UnitSummary from './unit-summary/UnitSummary.js';
import InsetHeading from './InsetHeading.js';
import FatButton from './FatButton.js';

import './BattlePreview.scss';

class BattlePreview extends Component {
  handleClear(role) {
    this.props.onClear(role);
  }

  handleClick() {
    this.props.onSimulateClick();
  }

  render() {
    let props = this.props;

    return (
      <div className="BattlePreview">
        <InsetHeading text="Unit Selection" />
        <UnitSummary unitConfig={props.unitConfig}
                     units={props.units}
                     onClear={(role) => this.handleClear(role)} />
        <FatButton onClick={() => this.handleClick()}
                   enabled={props.units.valid && !props.simulationInProgress}>
          {props.simulationInProgress ? 'Simulating...' : 'Simulate'}
        </FatButton>
      </div>
    );
  }
}

export default BattlePreview;
