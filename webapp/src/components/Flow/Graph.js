import React, { Component } from 'react'
import * as d3 from 'd3'
import Axis from '../common/Axis'
import Lines from './Lines'
import Dots from './Dots'

class Graph extends Component {

  componentWillMount () {
    const containerW = document.getElementById('graph-full').clientWidth - 30;
    this.margin = {top: 10, right: 10, bottom: 20, left: 40};
    const timeDomain = this.props.range.map((t) => t.startOf('month'));
    const countDomain = [0, this.props.max];
    this.dim = {
      w: containerW - this.margin.left - this.margin.right,
      h: 230 - this.margin.top - this.margin.bottom
    };
    this.x = d3.scaleTime().domain(timeDomain).range([0, this.dim.w]);
    this.y = d3.scaleLinear().domain(countDomain).range([this.dim.h, 0]);
  }

  render () {
    return (
      <div className="vis-bg flow-wrapper">
        <div className="option">
          <span><span className="number">Option 2</span> Select a friend as line</span>
          <span id="flow-stats" className="desc-right"></span>
        </div>
        <svg
          width={this.dim.w + this.margin.left + this.margin.right}
          height={this.dim.h + this.margin.top + this.margin.bottom}
        >
          <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
            <Axis x={this.x} y={this.y} dim={this.dim} {...this.props} pos="bottom" id="flow"/>
            <Lines x={this.x} y={this.y} {...this.props} />
            <Dots x={this.x} y={this.y} friend={this.props.friend} />
          </g>
        </svg>
      </div>
    );
  }
}

export default Graph