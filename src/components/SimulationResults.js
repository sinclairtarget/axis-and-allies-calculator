import React, { Component } from 'react';

import UnitSummary from './UnitSummary.js';
import InsetHeading from './InsetHeading.js';

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
        <InsetHeading text="Unit Selection" />
        <UnitSummary />
        <div className="simulate">Simulate</div>
      </div>
    );
  }
}

export default SimulationResults;
