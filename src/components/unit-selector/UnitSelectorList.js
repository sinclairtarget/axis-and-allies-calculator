import React, { Component } from 'react';

import UnitSelectorItem from './UnitSelectorItem.js';

import './UnitSelectorList.scss';

function UnitSelectorList(props) {
  let items = Object.entries(props.units).map(([unitKey, unit]) => {
    return <UnitSelectorItem key={unitKey} unit={unit} />;
  });

  return (
    <div className="UnitSelectorList">
      <div className="list-header">
        <h4 className="head-text cost">Cost</h4>
        <h4 className="head-text units">Units</h4>
      </div>
      <ul className="UnitSelectorList">{items}</ul>
    </div>
  );
}

export default UnitSelectorList;
