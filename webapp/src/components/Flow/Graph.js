import React, { Component } from 'react';
import * as d3 from 'd3';
import Axis from './Axis';
import VisibleFlowLines from './../../containers/VisibleFlowLines';

console.log('--------graph.js');

class Graph extends Component {

  componentWillMount () {
    const containerW = document.getElementById('root').clientWidth - 30;
    this.margin = {top: 20, right: 20, bottom: 40, left: 60};
    const timeDomain = this.context.store.getState().timeRange;
    const countDomain = [0, this.context.store.getState().friends.max];

    this.dim = {
      w: containerW - this.margin.left - this.margin.right,
      h: 300 - this.margin.top - this.margin.bottom
    };
    this.x = d3.scaleTime().domain(timeDomain).range([0, this.dim.w]);
    this.y = d3.scaleLinear().domain(countDomain).range([this.dim.h, 0]);
  }

  render () {
    return (
      <svg
        width={this.dim.w + this.margin.left + this.margin.right}
        height={this.dim.h + this.margin.top + this.margin.bottom}
      >
        <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
          <Axis x={this.x} y={this.y} dim={this.dim} />
          <VisibleFlowLines x={this.x} y={this.y} />
        </g>
      </svg>
    );
  }
}

Graph.contextTypes = {
  store: React.PropTypes.object
}

export default Graph;
