import React, { Component } from 'react';

import UnitSelectorItem from './UnitSelectorItem.js';

import './UnitSelectorList.scss';

class UnitSelectorList extends Component {
  handleUpdate(unitChange, unitKey) {
    this.props.onUpdate({
      key: unitKey,
      change: unitChange
    });
  }

  render() {
    let items = Object.entries(this.props.unitConfig).map(([unitKey, unit]) => {
      return (
        <UnitSelectorItem
          key={unitKey}
          unit={unit}
          count={this.props.units.get(unitKey) || 0}
          onUpdate={(change) => this.handleUpdate(change, unitKey)} />
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
