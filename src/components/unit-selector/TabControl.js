import React, { Component } from 'react';

import './TabControl.scss';

function TabControl(props) {
  return (
    <ul className={`TabControl ${props.role}`}>
      <li className="land selected">Land</li>
      <li className="sea">Sea</li>
      <li className="air">Air</li>
    </ul>
  );
}

export default TabControl;
