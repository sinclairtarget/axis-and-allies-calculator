import React, { Component } from 'react';

import UnitSummaryItem from './UnitSummaryItem.js';
import Button from '../Button.js';
import { ATTACKER_SIDE, DEFENDER_SIDE } from '../../lib/order-of-battle.js';

import './UnitSummaryPanel.scss';

class UnitSummaryPanel extends Component {
  renderPower() {
    let props = this.props;
    if (props.side == ATTACKER_SIDE) {
      return (
        <tr>
          <td className="label">Attack Power</td>
          <td>{props.units.totalStat(props.side, u => u.attack)}</td>
        </tr>
      );
    }
    else {
      return (
        <tr>
          <td className="label">Defense Power</td>
          <td>{props.units.totalStat(props.side, u => u.defense)}</td>
        </tr>
      );
    }
  }

  render() {
    let props = this.props;

    let items = props.units.unitCounts(props.side).map(([unitKey, count]) => {
      let unit = props.units.unitConfig[unitKey];
      let isValid = unit.valid(props.units, props.side);
      return (
        <UnitSummaryItem key={unitKey}
                         side={props.side}
                         unit={unit}
                         count={count}
                         isValid={isValid}/>
      );
    });

    let power = this.renderPower();

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
                <td>{props.units.totalStat(props.side, u => u.cost)}</td>
              </tr>
              {power}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UnitSummaryPanel;
