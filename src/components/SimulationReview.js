import React, { Component } from 'react';

import InsetHeading from './InsetHeading.js';

import './SimulationReview.scss';

function SimulationReview(props) {
  return (
    <div className="SimulationReview">
      <InsetHeading text="Simulation Results" />
    </div>
  );
}

export default SimulationReview;
