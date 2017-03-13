import React, { Component } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
// import moment from 'moment'
import Axis from '../common/Axis'
import { getMoment, getNumberedTime } from '../../processors/formatter'

class Tweets extends Component {

  componentWillMount () {
    const containerW = document.getElementById('graph-3qt').clientWidth - 30;
    this.margin = {top: 40, right: 10, bottom: 10, left: 40};
    const timeDomain = this.props.range;
    const dayDomain = [0, 24];
    this.dim = {
      w: containerW - this.margin.left - this.margin.right,
      h: 1000 - this.margin.top - this.margin.bottom
    };
    this.x = d3.scaleTime().domain(timeDomain).range([0, this.dim.w]);
    this.y = d3.scaleLinear().domain(dayDomain).range([0, this.dim.h]);
  }

  render () {
    // const self = this;
    // const dots = d3.selectAll('.d3-timeline-tweets')
    //   .data(this.props.data)
    //   .enter()
    //   .append('circle')
    //   .filter(function(d) {
    //     return self.props.range[0].diff(getMoment(d[0])) > 0 &&
    //       self.props.range[1].diff(getMoment(d[0])) < 0;
    //   })
    //   .attr('cx', function(d) {
    //     return self.x(d[0]);
    //   })
    //   .attr('cy', function(d) {
    //     return self.y(getNumberedTime(d[0]));
    //   })
    //   .attr('r', 2)
    //   .attr('class', '.d3-timeline-tweets')

    const dots = this.props.data.map((t, i) => (
      <circle
        cx={this.x(getMoment(t[0]))}
        cy={this.y(getNumberedTime(t[0]))}
        r="2"
        key={i} />
    ));

    return (
      <svg
        width={this.dim.w + this.margin.left + this.margin.right}
        height={this.dim.h + this.margin.top + this.margin.bottom}
      >
        <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
          <Axis x={this.x} y={this.y} dim={this.dim} {...this.props} id="tweet-dots"/>
          {dots}
        </g>
      </svg>
    );
  }
}

export default Tweets