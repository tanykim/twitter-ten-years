import React, { Component } from 'react'
import * as d3 from 'd3'

class Axis extends Component {
  componentDidMount() {
    if (this.props.x) {
      d3.select(`#${this.props.id}-axis-x`)
        .call(this.props.pos === 'bottom' ?
          d3.axisBottom(this.props.x) :
          d3.axisTop(this.props.x));
    }
    if (this.props.y) {
      d3.select(`#${this.props.id}-axis-y`)
        .call(d3.axisLeft(this.props.y));
    }
  }
  render() {
    const dim = this.props.dim;
    return (
      <g>
        {this.props.x && <g
          transform={`translate(0, ${this.props.pos === 'bottom' ? dim.h : 0})`}
          id={`${this.props.id}-axis-x`}
          className="axis"/>}
        {this.props.y && <g
          id={`${this.props.id}-axis-y`}
          className="axis"/>}
      </g>
    );
  }
}

export default Axis
