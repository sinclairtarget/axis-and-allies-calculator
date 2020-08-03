import React, { Component } from 'react';

import UnitIcon from '../UnitIcon.js';
import UnitCounter from './UnitCounter.js';

import './UnitSelectorItem.scss';

function UnitSelectorItem(props) {
  return (
    <li className="UnitSelectorItem">
      <UnitIcon unit={props.unit} />
      <div className="unit-info">
        <h4 className="unit-title">{props.unit.name}</h4>
        <p className="unit-description">
          Atk {props.unit.attack} / Def {props.unit.defense} / Mov {props.unit.move}
        </p>
      </div>
      <h2 className="unit-cost">{props.unit.cost}</h2>
      <UnitCounter count={0}/>
    </li>
  );
}

export default UnitSelectorItem;
