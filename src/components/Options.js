import React, { Component } from 'react';

import './Options.scss';

class Options extends Component {
  handleCheckboxChange(ev) {
    if (this.props.enabled)
      this.props.onToggle(ev.target.value);
  }

  get classes() {
    if (this.props.enabled)
      return "Options";
    else
      return "Options disabled";
  }

  render() {
    return (
      <div className={this.classes}>
        <h3 className="heading">Options</h3>
        <div className="option-group-container">
          <div className="option-group">
            <input type="checkbox"
                   id="prioritizeConquest"
                   value="prioritizeConquest"
                   onChange={(ev) => this.handleCheckboxChange(ev)}
                   checked={this.props.options.prioritizeConquest} />
            <label htmlFor="prioritizeConquest">Prioritize Conquest</label>
          </div>
          <div className="option-group">
            <input type="checkbox"
                   id="oneRoundOnly"
                   value="oneRoundOnly"
                   onChange={(ev) => this.handleCheckboxChange(ev)}
                   checked={this.props.options.oneRoundOnly} />
            <label htmlFor="oneRoundOnly">Retreat After One Round</label>
          </div>
        </div>
      </div>
    );
  }
}

export default Options;
