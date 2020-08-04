import React, { Component } from 'react';

import './InsetHeading.scss';

function InsetHeading(props) {
  return (
    <h2 className="InsetHeading"
             text={props.text}>{props.text}</h2>
  );
}

export default InsetHeading;
