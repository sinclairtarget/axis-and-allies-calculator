import React, { Component } from 'react';

import TabControl from './TabControl.js';
import UnitSelectorList from './UnitSelectorList.js';

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

  render() {
    return (
      <div className={`UnitSelector ${this.props.role}`}>
        <TabControl role={this.props.role}
                    tabs={TABS}
                    selected={this.state.unitDomain}
                    onSwitch={(tabKey) => this.handleTabSwitch(tabKey)} />
        <UnitSelectorList units={this.props.units[this.state.unitDomain]} />
      </div>
    );
  }
}

export default UnitSelector;
