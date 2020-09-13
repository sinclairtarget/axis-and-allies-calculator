import React, { Component } from 'react';

import Button from '../Button.js';

import './TabControl.scss';

class TabControl extends Component {
  handleClick(tabKey) {
    this.props.onSwitch(tabKey);
  }

  handleClear() {
    this.props.onClear();
  }

  tabClasses(tabKey) {
    if (tabKey == this.props.selected)
      return tabKey + ' selected';
    else
      return tabKey;
  }

  renderButton() {
    if (this.props.showButton) {
      return (
        <Button onClick={() => this.handleClear()}
                enabled={!this.props.simulationInProgress}>Clear</Button>
      );
    }

    return null;
  }

  render() {
    let tabItems = this.props.tabs.map(tab => {
      return (<li className={this.tabClasses(tab.key)}
                  onClick={() => this.handleClick(tab.key)}
                  key={tab.key}>
                {tab.name}
              </li>);
    });

    let button = this.renderButton();

    return (
      <ul className={`TabControl ${this.props.side}`}>
        {tabItems}
        {button}
      </ul>
    );
  }
}

export default TabControl;
