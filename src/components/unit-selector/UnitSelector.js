import React, { Component } from 'react';

import TabControl from './TabControl.js';
import UnitSelectorList from './UnitSelectorList.js';
import InsetHeading from '../InsetHeading.js';
import { ATTACKER_SIDE } from '../../lib/order-of-battle.js';

import './UnitSelector.scss';

const TABS = [
  {
    key: 'land',
    name: 'Land'
  },
  {
    key: 'sea',
    name: 'Sea'
  },
  {
    key: 'air',
    name: 'Air'
  }
];

class UnitSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unitDomain: 'land'
    };
  }

  handleTabSwitch(tabKey) {
    this.setState({
      unitDomain: tabKey
    });
  }

  handleClear() {
    this.props.onClear(this.props.side);
  }

  handleUnitUpdate(unitKey, delta) {
    this.props.onUpdate(unitKey, delta);
  }

  labelForSide() {
    return this.props.side == ATTACKER_SIDE ? 'Attacker' : 'Defender';
  }

  render() {
    let shouldShowButton = this.props.units.totalUnits(this.props.side) > 0;

    return (
      <div className={`UnitSelector ${this.props.side}`}>
        <InsetHeading text={this.labelForSide()} />
        <TabControl side={this.props.side}
                    tabs={TABS}
                    selected={this.state.unitDomain}
                    onSwitch={(tabKey) => this.handleTabSwitch(tabKey)}
                    showButton={shouldShowButton}
                    simulationInProgress={this.props.simulationInProgress}
                    onClear={() => this.handleClear()} />
        <UnitSelectorList
          units={this.props.units}
          side={this.props.side}
          domain={this.state.unitDomain}
          enabled={!this.props.simulationInProgress}
          onUpdate={(unitKey, delta) => this.handleUnitUpdate(unitKey, delta)} />
      </div>
    );
  }
}

export default UnitSelector;
