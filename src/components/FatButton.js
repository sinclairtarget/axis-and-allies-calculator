import React, { Component } from 'react';

import Button from './Button.js';

import './FatButton.scss';

class FatButton extends Component {
  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <Button type="FatButton"
              enabled={this.props.enabled}
              onClick={() => this.handleClick()}>
        {this.props.children}
      </Button>
    );
  }
}

export default FatButton;
