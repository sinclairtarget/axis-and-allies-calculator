import React, { Component } from 'react';

import UnitSummaryItem from './UnitSummaryItem.js';

import './UnitSummaryPanel.scss';

function total(units, unitConfig, stat) {
  return Array.from(units.entries()).reduce((sum, [unitKey, count]) => {
    return sum + unitConfig[unitKey][stat] * count;
  }, 0);
}

function UnitSummaryPanel(props) {
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
        <td>{total(props.units, props.unitConfig, 'attack')}</td>
      </tr>
    );
  }
  else {
    power = (
      <tr>
        <td className="label">Defense Power</td>
        <td>{total(props.units, props.unitConfig, 'defense')}</td>
      </tr>
    );
  }

  return (
    <div className="UnitSummaryPanel">
      <div className="summary">
        {items}
      </div>
      <table className="statistics">
        <tbody>
          <tr>
            <td className="label">IPC Cost</td>
            <td>{total(props.units, props.unitConfig, 'cost')}</td>
          </tr>
          {power}
        </tbody>
      </table>
    </div>
  );
}

export default UnitSummaryPanel;
