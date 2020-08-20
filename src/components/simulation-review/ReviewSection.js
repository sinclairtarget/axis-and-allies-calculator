import React, { Component } from 'react';

import './ReviewSection.scss';

function ReviewSection(props) {
  return (
    <section className="ReviewSection">
      <h3 className="heading">{props.title}</h3>
      {props.children}
    </section>
  );
}

export default ReviewSection;
