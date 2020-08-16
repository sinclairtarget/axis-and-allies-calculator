import React, { Component } from 'react';

import './Button.scss';

class Button extends Component {
  handleClick() {
    if (this.props.enabled)
      this.props.onClick();
  }

  render() {
    let classes = this.props.enabled ? "Button" : "Button disabled";
    return (
      <button className={classes} onClick={() => this.handleClick()}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
