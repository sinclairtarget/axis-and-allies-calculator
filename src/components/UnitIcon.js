import React, { Component } from 'react';

import './UnitIcon.scss';

function UnitIcon(props) {
  let classes = 'UnitIcon';
  if (props.role)
    classes += ' ' + props.role;

  if (('enabled' in props) && !props.enabled)
    classes += ' ' + 'disabled';

  return (
    <div className={classes}>
      <h2 className="symbol">{props.unit.symbol}</h2>
    </div>
  );
}

export default UnitIcon;
