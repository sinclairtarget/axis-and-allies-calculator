import React, { Component } from 'react';

import './Footer.scss';

export default function Footer(props) {
  return (
    <footer>
      <p>
        Created by <a href="https://sinclairtarget.com">Sinclair Target</a>
      </p>
      <a href="https://github.com/sinclairtarget/axis-and-allies-calculator">
        <img src="/images/github.svg" />
      </a>
    </footer>
  );
}
