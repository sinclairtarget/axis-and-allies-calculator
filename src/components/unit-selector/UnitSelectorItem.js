import React, { Component } from 'react';

import UnitIcon from '../UnitIcon.js';
import UnitCounter from './UnitCounter.js';

import './UnitSelectorItem.scss';

class UnitSelectorItem extends Component {
  handleUpdate(unitChange) {
    this.props.onUpdate(unitChange);
  }

  render() {
    return (
      <li className="UnitSelectorItem">
        <UnitIcon unit={this.props.unit} />
        <div className="unit-info">
          <h4 className="unit-title">{this.props.unit.name}</h4>
          <p className="unit-description">
            Atk {this.props.unit.attack} / Def {this.props.unit.defense} / Mov {this.props.unit.move}
          </p>
        </div>
        <h2 className="unit-cost">{this.props.unit.cost}</h2>
        <UnitCounter count={this.props.count}
                     onUpdate={(change) => this.handleUpdate(change)} />
      </li>
    );
  }
}

export default UnitSelectorItem;
