import React, { Component } from 'react';
import * as d3 from 'd3';

import './ConquestChance.scss';

let perc = d3.format('.0%');

function ConquestChance(props) {
  return (
    <div className="ConquestChance">
      <h1 className="big-number">
        {perc(props.simulation.conquestChance)}
      </h1>
      <p className="note">
        This is the probability that the attacker occupies the territory. In
    other words, this is the probability that all defending units are destroyed
    while the attacker has at least one unit remaining.
      </p>
    </div>
  );
}

export default ConquestChance;
