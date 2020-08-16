import React, { Component } from 'react';

import UnitSelectorItem from './UnitSelectorItem.js';

import './UnitSelectorList.scss';

class UnitSelectorList extends Component {
  handleUpdate(unitKey, delta) {
    this.props.onUpdate(unitKey, delta);
  }

  render() {
    let unitConfig = this.props.units.configForDomain(this.props.domain);
    let items = Object.entries(unitConfig).map(([unitKey, unit]) => {
      return (
        <UnitSelectorItem
          key={unitKey}
          unit={unit}
          count={this.props.units.unitCount(this.props.side, unitKey)}
          onUpdate={(delta) => this.handleUpdate(unitKey, delta)} />
      );
    });

    return (
      <div className="UnitSelectorList">
        <div className="list-header">
          <h4 className="head-text cost">Cost</h4>
          <h4 className="head-text units">Units</h4>
        </div>
        <ul>{items}</ul>
      </div>
    );
  }
}

export default UnitSelectorList;
