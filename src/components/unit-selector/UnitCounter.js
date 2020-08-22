import React, { Component } from 'react';

import './UnitCounter.scss';
import Button from '../Button.js';

class UnitCounter extends Component {
  handleClick(delta) {
    this.props.onUpdate(delta);
  }

  render() {
    let classes = this.props.enabled ?
                  'UnitCounter' :
                  'UnitCounter disabled';

    return (
      <div className={classes}>
        <Button onClick={() => this.handleClick(-1)}
                enabled={this.props.enabled}>
          <p>-</p>
        </Button>
        <div className="count-display">
          <h2 className="count">{this.props.count}</h2>
        </div>
        <Button onClick={() => this.handleClick(1)}
                enabled={this.props.enabled}>
          <p>+</p>
        </Button>
      </div>
    );
  }
}

export default UnitCounter;
