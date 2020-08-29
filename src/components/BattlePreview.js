import React, { Component } from 'react';

import UnitSummary from './unit-summary/UnitSummary.js';
import InsetHeading from './InsetHeading.js';
import FatButton from './FatButton.js';
import Options from './Options.js';

import './BattlePreview.scss';

class BattlePreview extends Component {
  handleClear(role) {
    this.props.onClear(role);
  }

  handleClick() {
    this.props.onSimulateClick();
  }

  handleOptionToggle(optionName) {
    this.props.onOptionToggle(optionName);
  }

  handleHelpClick() {
    this.props.onHelpClick();
  }

  render() {
    let props = this.props;

    return (
      <div className="BattlePreview">
        <InsetHeading text="Unit Summary" />
        <UnitSummary unitConfig={props.unitConfig}
                     units={props.units}
                     simulationInProgress={props.simulationInProgress}
                     onClear={(role) => this.handleClear(role)} />
        <Options options={props.options}
                 onToggle={(optionName) => this.handleOptionToggle(optionName)}
                 onHelpClick={() => this.handleHelpClick()}
                 enabled={!props.simulationInProgress} />
        <FatButton onClick={() => this.handleClick()}
                   enabled={props.units.valid && !props.simulationInProgress}>
          {props.simulationInProgress ? 'Simulating...' : 'Simulate'}
        </FatButton>
      </div>
    );
  }
}

export default BattlePreview;
