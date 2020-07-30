import React, { Component } from 'react';

import './UnitSelector.scss';

function UnitSelector(props) {
  return <div className={`UnitSelector ${props.role}`}>
           <div className="button"></div>
           <div className="button"></div>
           <div className="button"></div>
           <div className="button"></div>
         </div>;
}

export default UnitSelector;
