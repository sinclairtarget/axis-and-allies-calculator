import React, { Component } from 'react';

import UnitSummaryItem from './UnitSummaryItem.js';

import './UnitSummaryPanel.scss';

function total(units, unitConfig, accessor) {
  return Array.from(units.entries()).reduce((sum, [unitKey, count]) => {
    return sum + accessor(unitConfig[unitKey]) * count;
  }, 0);
}

class UnitSummaryPanel extends Component {
  handleClear() {
    this.props.onClear();
  }

  render() {
    let props = this.props;

    let items = Array.from(props.units.entries()).filter(([unitKey, count]) => {
      return count > 0;
    }).map(([unitKey, count]) => {
      return (
        <UnitSummaryItem key={unitKey}
                         role={props.role}
                         unit={props.unitConfig[unitKey]}
                         count={count} />
      );
    });

    var power;
    if (props.role == 'attack') {
      power = (
        <tr>
          <td className="label">Attack Power</td>
          <td>{total(props.units, props.unitConfig, (u) => u.attack)}</td>
        </tr>
      );
    }
    else {
      power = (
        <tr>
          <td className="label">Defense Power</td>
          <td>{total(props.units, props.unitConfig, (u) => u.defense)}</td>
        </tr>
      );
    }

    let button = null;
    if (total(props.units, props.unitConfig, (u) => 1) > 0) {
      button = <button onClick={() => this.handleClear()}>Clear</button>;
    }

    return (
      <div className="UnitSummaryPanel">
        <div className="summary">
          {items}
        </div>
        <div className="info">
          <table>
            <tbody>
              <tr>
                <td className="label">IPC Cost</td>
                <td>{total(props.units, props.unitConfig, u => u.cost)}</td>
              </tr>
              {power}
            </tbody>
          </table>
          {button}
        </div>
      </div>
    );
  }
}

export default UnitSummaryPanel;
