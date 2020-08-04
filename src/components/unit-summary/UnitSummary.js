import React, { Component } from 'react';

import UnitSummaryPanel from './UnitSummaryPanel.js';

import './UnitSummary.scss';

function UnitSummary(props) {
  return (
    <div className="UnitSummary">
      <UnitSummaryPanel role='attack'
                        unitConfig={props.unitConfig}
                        units={props.units['attack']} />
      <div className="vs-box">
        <h4 className="vs-title">vs</h4>
      </div>
      <UnitSummaryPanel role='defense'
                        unitConfig={props.unitConfig}
                        units={props.units['defense']} />
    </div>
  );
}

export default UnitSummary;
