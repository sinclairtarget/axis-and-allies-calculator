import React, { Component } from 'react';

import './TabControl.scss';

class TabControl extends Component {
  handleClick(tabKey) {
    this.props.onSwitch(tabKey);
  }

  tabClasses(tabKey) {
    if (tabKey == this.props.selected)
      return tabKey + ' selected';
    else
      return tabKey;
  }

  render() {
    let tabItems = this.props.tabs.map(tab => {
      return (<li className={this.tabClasses(tab.key)}
                  onClick={() => this.handleClick(tab.key)}
                  key={tab.key}>
                {tab.name}
              </li>);
    });

    return (
      <ul className={`TabControl ${this.props.role}`}>
        {tabItems}
      </ul>
    );
  }
}

export default TabControl;
