import React, { Component } from 'react';

import UnitSummary from './UnitSummary.js';

import './SimulationResults.scss';

function SimulationResults(props) {
  if (props.simulation) {
    return (
      <div className="SimulationResults">
      </div>
    );

  }
  else {
    return (
      <div className="SimulationResults">
        <h2 className="title" title="Unit Selection">Unit Selection</h2>
        <UnitSummary />
        <div className="simulate">Simulate</div>
      </div>
    );
  }
}

export default SimulationResults;
