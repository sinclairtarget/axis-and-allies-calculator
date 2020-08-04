import React, { Component } from 'react';

import InsetHeading from './InsetHeading.js';

import './SimulationResults.scss';

function SimulationResults(props) {
  return (
    <div className="SimulationResults">
      <InsetHeading text="Simulation Results" />
    </div>
  );
}

export default SimulationResults;
