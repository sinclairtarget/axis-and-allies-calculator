import React, { Component } from 'react';

import './UnitIcon.scss';

function UnitIcon(props) {
  return (
    <div className="UnitIcon">
      <h2 className="symbol">{props.unit.symbol}</h2>
    </div>
  );
}

export default UnitIcon;
