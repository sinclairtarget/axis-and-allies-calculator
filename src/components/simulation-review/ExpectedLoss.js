import React, { Component } from 'react';
import * as d3 from 'd3';

import { ATTACKER_KEY, DEFENDER_KEY } from '../../lib/simulation-results.js';

import './ExpectedLoss.scss';

let format = d3.format('.1f');

function noteText(vizKey) {
  let side = vizKey == ATTACKER_KEY ? 'the attacker' : 'the defender';
  return `This is the value of the units ${side} would lose on average
          if you were to fight this battle over and over again.`;
}

function ExpectedLoss(props) {
  let losses = props.simulation
                    .results
                    .map(result => result[props.vizKey]);
  let mean = d3.mean(losses);

  return (
    <div className="ExpectedLoss">
      <h1 className="big-number">{format(mean)}</h1>
      <p className="note">{noteText(props.vizKey)}</p>
    </div>
  );
};

export default ExpectedLoss;
