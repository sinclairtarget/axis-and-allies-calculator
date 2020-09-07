import React, { Component } from 'react';
import * as d3 from 'd3';

import Dimensions from '../../lib/dimensions.js';
import * as util from '../../lib/util.js';

import './FrequencyPlot.scss';

const vizMargin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

const vizPadding = {
  top: 20,
  right: 20,
  bottom: 53,
  left: 68
};

const TICK_PADDING = 8;

let formatProbability = d3.format('.0%');

function calcFrequency(simulation, vizKey) {
  // Group by IPC
  let grouped = simulation.results.reduce((map, result) => {
    let IPC = result[vizKey];

    if (!map.has(IPC))
      map.set(IPC, 1);
    else
      map.set(IPC, map.get(IPC) + 1);

    return map;
  }, new Map());

  // Normalize
  for (let [ipc, count] of grouped) {
    grouped.set(ipc, count / simulation.n);
  }

  return Array.from(grouped.entries());
}

function calcXAxisTicks(xDomain, maxCount) {
  let count = Math.min(xDomain.length, maxCount);
  let indices = d3.ticks(0, xDomain.length - 1, count);
  return indices.reduce((arr, index) => arr.concat([xDomain[index]]), []);
}

export default class FreqPlot extends Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
    this.svgRef = React.createRef();
    this.dim = new Dimensions(props.width,
                              props.height,
                              vizMargin,
                              vizPadding);
  }

  componentDidMount() {
    let data = calcFrequency(this.props.simulation, this.props.vizKey);
    this.setUp(data);
    this.setUpTooltip();
  }

  setUp(data) {
    let plotWidth = this.dim.plotWidth();
    let plotHeight = this.dim.plotHeight();

    let xDomain = data.map(([ipc, p]) => ipc)
                      .sort((a, b) => a < b ? 1 : b < a ? -1 : 0);
    this.xScale = d3.scaleBand(xDomain, [0, plotWidth])
                    .padding(0.2);

    let yDomain = [0, d3.max(data, ([ipc, p]) => p)];
    this.yScale = d3.scaleLinear(yDomain, [plotHeight, 0])
                    .nice();

    let svg = d3.select(this.svgRef.current);
    this.panel = svg.attr('viewBox', `0 0 ${this.dim.width} ${this.dim.height}`)
                    .append('g')
                    .attr('transform', util.transl(this.dim.margin.left,
                                                   this.dim.margin.top))
                    .attr('class', 'panel');

    // Add axes
    let xTicks = calcXAxisTicks(xDomain, this.props.maxTicks);
    let xAxis = d3.axisBottom(this.xScale)
                  .tickPadding(TICK_PADDING)
                  .tickValues(xTicks);
    let yAxis = d3.axisLeft(this.yScale)
                  .tickFormat(formatProbability);

    this.panel.append("g")
              .attr("transform", util.transl(this.dim.padding.left,
                                             this.dim.padding.top + plotHeight))
              .attr("class", "axis x-axis")
              .call(xAxis);

    this.panel.append("g")
              .attr("transform", util.transl(this.dim.padding.left,
                                             this.dim.padding.top))
              .attr("class", "axis y-axis")
              .call(yAxis);

    this.plot = this.panel
                    .append("g")
                    .attr("transform", util.transl(this.dim.padding.left,
                                                   this.dim.padding.top))
                    .attr("class", "plot");

    this.plot.selectAll('rect')
             .data(data)
             .join('rect')
             .attr('x', ([ipc, p]) => this.xScale(ipc))
             .attr('y', ([ipc, p]) => this.yScale(p))
             .attr('width', this.xScale.bandwidth())
             .attr('height', ([ipc, p]) => plotHeight - this.yScale(p));

    // Add axis labels
    this.yTitle =
      this.panel.append("text")
                .attr("x", 0)
                .attr("y", plotHeight / 2)
                .attr("text-anchor", "middle")
                .attr("class", "axis-title y-axis-title")
                .text("Probability of Outcome")
                .attr("transform", util.rot(-90, 12, plotHeight / 2));

    this.xTitle =
      this.panel.append("text")
                .attr("x", this.dim.padding.left + plotWidth / 2)
                .attr("y", plotHeight + this.dim.padding.top + 51)
                .attr("text-anchor", "middle")
                .attr("class", "axis-title x-axis-title")
                .text("IPC Loss");
  }

  setUpTooltip() {
    this.tooltip = d3.select(this.divRef.current)
                      .append('div')
                      .attr('class', 'tooltip')
                      .style('visibility', 'hidden');

    this.plot.selectAll('rect')
             .on('mouseenter', (_, [ipc, p]) => {
               this.tooltip.style('visibility', 'visible')
                           .text(this.textForTooltip(ipc, p));
             })
             .on('mousemove', (ev) => {
               let [x, y] = d3.pointer(ev, this.divRef.current);

               this.tooltip.style('left', x + 5 + 'px')
                           .style('top', y + 5 + 'px');
             })
             .on('mouseleave', () => {
               this.tooltip.style('visibility', 'hidden')
                           // Move back to left all the way, because if the
                           // tooltip is overflowing, it will continue causing
                           // the containing div to expand even if not visible
                           .style('left', '0px');
             });
  }

  textForTooltip(ipcLoss, probability) {
    if (ipcLoss == 0)
      return `${formatProbability(probability)} chance of no losses`;
    else
      return `${formatProbability(probability)} chance of ${ipcLoss} IPC`;
  }

  render() {
    return (
      <div className="FrequencyPlot" ref={this.divRef} >
        <svg width="100%"
             height="100%"
             ref={this.svgRef} />
      </div>
    );
  }
}
