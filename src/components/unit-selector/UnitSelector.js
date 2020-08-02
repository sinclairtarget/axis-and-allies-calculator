import React, { Component } from 'react';

import TabControl from './TabControl.js';

import './UnitSelector.scss';

function UnitSelector(props) {
  return <div className={`UnitSelector ${props.role}`}>
           <TabControl role={props.role} />
           <div className="button"></div>
           <div className="button"></div>
           <div className="button"></div>
           <div className="button"></div>
         </div>;
}

export default UnitSelector;
