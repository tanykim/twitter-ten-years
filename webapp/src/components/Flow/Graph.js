import React, { Component } from 'react'
import * as d3 from 'd3'
import Axis from '../common/Axis'
import Lines from './Lines'
import Dots from './Dots'

class Graph extends Component {

  componentWillMount () {
    let containerW = document.getElementById('graph-full').clientWidth - 30;
    containerW = Math.max(containerW, 1000);

    this.margin = {top: 20, right: 20, bottom: 10, left: 20};
    const timeDomain = this.props.range.map((t) => t.startOf('month'));
    const countDomain = [0, this.props.max];
    this.dim = {
      w: containerW - this.margin.left - this.margin.right,
      h: 230 - this.margin.top - this.margin.bottom
    };
    this.x = d3.scaleTime().domain(timeDomain).range([0, this.dim.w]);
    this.y = d3.scaleLinear().domain(countDomain).range([this.dim.h, 0]);
  }

  componentDidMount() {
    d3.select('#flow-axis-x').selectAll('text')
      .attr('y', 0)
      .attr('x', -this.dim.h)
      .attr('dy', -4)
      .attr('transform', 'rotate(90)')
      .style('text-anchor', 'start');
    d3.select('#flow-axis-y').selectAll('text')
      .attr('y', 0)
      .attr('x', 4)
      .attr('dy', -4)
      .style('text-anchor', 'start')
      .style('alignment-baseline', 'baseline');
    d3.select('#flow-axis-y')
      .append('text')
      .attr('x', 12)
      .attr('y', this.dim.h)
      .text('MENTIONS PER MONTH')
      .attr('dy', -4)
      .style('text-anchor', 'start')
      .style('alignment-baseline', 'baseline');
  }

  render () {
    return (
      <div className="vis-bg flow-wrapper">
        <div className="row option">
          <div className="col-xs-12 col-lg-6"><span className="number">Option 2</span> Select a friend as line</div>
          <div className="col-xs-12 col-lg-6 hidden-xs hidden-sm hidden-md desc-right" id="flow-stats">aaaaaa</div>
        </div>
        <div className="svg-wrapper-scrolled">
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
      </div>
    );
  }
}

export default Graph