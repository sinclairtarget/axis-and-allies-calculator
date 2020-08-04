import React, { Component } from 'react';

import UnitSummary from './unit-summary/UnitSummary.js';
import InsetHeading from './InsetHeading.js';

import './BattlePreview.scss';

function BattlePreview(props) {
  return (
    <div className="BattlePreview">
      <InsetHeading text="Unit Selection" />
      <UnitSummary unitConfig={props.unitConfig}
                   units={props.units} />
      <div className="simulate">Simulate</div>
    </div>
  );
}

export default BattlePreview;
