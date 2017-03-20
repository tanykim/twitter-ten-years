import React, { Component } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
import moment from 'moment'
import Axis from '../common/Axis'

class Bars extends Component {

  componentWillMount () {
    const containerW = document.getElementById('graph-full').clientWidth - 30;
    this.margin = {top: 40, right: 10, bottom: 10, left: 40};
    const timeDomain = [this.props.range[0].startOf('month'),
      this.props.range[1].add(1, 'month').startOf('month')];
    const countDomain = [0, _.max(this.props.data.map((d) => d[1]))];
    this.dim = {
      w: containerW - this.margin.left - this.margin.right,
      h: 200 - this.margin.top - this.margin.bottom
    };
    this.x = d3.scaleTime().domain(timeDomain).range([0, this.dim.w]);
    this.y = d3.scaleLinear().domain(countDomain).range([0, this.dim.h]);
  }

  render () {
    const barW = this.dim.w / this.props.data.length;
    const bars = this.props.data.map((d) => (
      <rect
        x={this.x(moment(d[0], 'YYYY-MM'))}
        y="0"
        width={barW}
        height={this.y(d[1])}
        key={d[0]}
      />)
    )

    return (
      <svg
        width={this.dim.w + this.margin.left + this.margin.right}
        height={this.dim.h + this.margin.top + this.margin.bottom}
      >
        <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
          <Axis x={this.x} y={this.y} dim={this.dim} {...this.props} id="timeline"/>
          {bars}
          {!_.isEmpty(this.props.selectedRange) &&
            //show brush
            <rect
              x={this.x(moment(this.props.selectedRange[0], 'YYYY-MM-DD'))}
              y="0"
              width={this.x(moment(this.props.selectedRange[1], 'YYYY-MM-DD'))
               - this.x(moment(this.props.selectedRange[0], 'YYYY-MM-DD'))}
              height={this.dim.h}
              className="timeline-brush"
            ></rect>}
        </g>
      </svg>
    );
  }
}

export default Bars