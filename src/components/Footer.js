import React, { Component } from 'react';

import './Footer.scss';

export default function Footer(props) {
  return (
    <footer>
      <p>
        Based on the <a href="https://axisallies.com/rules/axis-allies-rules-1942-2nd-edition.pdf">
        Second Edition</a> ruleset.
      </p>
      <p>
        Created by <a href="https://sinclairtarget.com">Sinclair Target</a>.
      </p>
      <a href="https://github.com/sinclairtarget/axis-and-allies-calculator">
        <img src="/images/github.svg" />
      </a>
    </footer>
  );
}
