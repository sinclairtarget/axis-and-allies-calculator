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
          <svg viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
        </Button>
        <div className="count-display">
          <h2 className="count">{this.props.count}</h2>
        </div>
        <Button onClick={() => this.handleClick(1)}
                enabled={this.props.enabled}>
          <svg className="plus" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
        </Button>
      </div>
    );
  }
}

export default UnitCounter;
