import React, { Component } from 'react';
import * as d3 from 'd3';

export default class FreqPlot extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
  }

  componentDidMount() {
    this.setUp();
  }

  componentDidUpdate() {
    this.update();
  }

  setUp() {
    let svg = d3.select(this.svgRef.current);
    svg.append('rect')
       .attr('x', 0)
       .attr('y', 0)
       .attr('width', 150)
       .attr('height', 150);
  }

  update() {
    console.log('Update');
  }

  render() {
    return <svg width="300" height="300" ref={this.svgRef} />;
  }
}
