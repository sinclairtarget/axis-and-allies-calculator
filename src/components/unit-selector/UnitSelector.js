import React, { Component } from 'react';

import TabControl from './TabControl.js';

import './UnitSelector.scss';

function UnitSelector(props) {
  let tabs = [
    {
      key: 'land',
      name: 'Land'
    },
    {
      key: 'sea',
      name: 'Sea'
    },
    {
      key: 'air',
      name: 'Air'
    }
  ];

  return (
    <div className={`UnitSelector ${props.role}`}>
      <TabControl role={props.role}
                  tabs={tabs}
                  selected='land' />
    </div>
  );
}

export default UnitSelector;
