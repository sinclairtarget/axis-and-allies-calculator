import React, { Component } from 'react';

import './UnitCounter.scss';

class UnitCounter extends Component {
  render() {
    return (
      <div className="UnitCounter">
        <div className="button minus"><p>-</p></div>
        <div className="count-display">
          <h2 className="count">{this.props.count}</h2>
        </div>
        <div className="button plus"><p>+</p></div>
      </div>
    );
  }
}

export default UnitCounter;
