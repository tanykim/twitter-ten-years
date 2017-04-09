import React, { Component } from 'react'
import * as d3 from 'd3'

class Axis extends Component {

  componentDidMount() {

    const { x, y, id, dim, pos } = this.props;

    if (x) {
      d3.select(`#${id}-axis-x`)
        .call(
          pos === 'bottom' ?
          d3.axisBottom(x).tickSize(-dim.h).tickPadding(6) :
          d3.axisBottom(x).tickSize(dim.h).tickPadding(6));
    }
    if (y) {
      d3.select(`#${id}-axis-y`)
        .call(d3.axisLeft(y)
          .ticks(5)
          .tickSize(-dim.w)
          .tickPadding(6)
        );
    }
  }

  render() {
    const { x, y, id, dim, pos } = this.props;
    return (
      <g>
        {x && <g
          transform={`translate(0, ${pos === 'bottom' ? dim.h : 0})`}
          id={`${id}-axis-x`}
          className='axis'/>}
        {y && <g
          id={`${id}-axis-y`}
          className='axis'/>}
      </g>
    );
  }
}

export default Axis
