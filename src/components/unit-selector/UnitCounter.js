import React, { Component } from 'react';

import './UnitCounter.scss';

class UnitCounter extends Component {
  handleClick(change) {
    this.props.onUpdate(change);
  }

  render() {
    return (
      <div className="UnitCounter">
        <button onClick={() => this.handleClick(-1)}>
          <p>-</p>
        </button>
        <div className="count-display">
          <h2 className="count">{this.props.count}</h2>
        </div>
        <button onClick={() => this.handleClick(1)}>
          <p>+</p>
        </button>
      </div>
    );
  }
}

export default UnitCounter;
