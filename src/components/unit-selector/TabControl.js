import React, { Component } from 'react';

import './TabControl.scss';

class TabControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected
    };
  }

  handleClick(tabKey) {
    this.setState({
      selected: tabKey
    });
  }

  tabClasses(tabKey) {
    if (tabKey == this.state.selected)
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
