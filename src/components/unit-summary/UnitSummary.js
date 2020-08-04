import React, { Component } from 'react';

import UnitSummaryPanel from './UnitSummaryPanel.js';

import './UnitSummary.scss';

class UnitSummary extends Component {
  handleClear(role) {
    this.props.onClear(role);
  }

  render() {
    let props = this.props;

    return (
      <div className="UnitSummary">
        <UnitSummaryPanel role='attack'
                          unitConfig={props.unitConfig}
                          units={props.units['attack']}
                          onClear={() => this.handleClear('attack')} />
        <div className="vs-box">
          <h4 className="vs-title">vs</h4>
        </div>
        <UnitSummaryPanel role='defense'
                          unitConfig={props.unitConfig}
                          units={props.units['defense']}
                          onClear={() => this.handleClear('defense')} />
      </div>
    );
  }
}

export default UnitSummary;
