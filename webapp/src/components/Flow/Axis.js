import React, { Component } from 'react'
import * as d3 from 'd3'

class Axis extends Component {
  componentDidMount() {
    d3.select('#axis-x')
      .call(d3.axisBottom(this.props.x));
    d3.select('#axis-y')
      .call(d3.axisLeft(this.props.y));
  }
  render() {
    const dim = this.props.dim;
    return (
      <g>
        <g
          transform={`translate(0, ${dim.h})`}
          id="axis-x"
          className="axis" />
        <g
          id="axis-y"
          className="axis" />
      </g>
    );
  }
}

export default Axis
