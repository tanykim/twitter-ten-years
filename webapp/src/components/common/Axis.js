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
      //rotate axis label
      if (id === 'timeline') {
        d3.select(`#${id}-axis-x`).selectAll('text')
          .attr('y', 0)
          .attr('x', dim.h)
          .attr('dy', -4)
          .attr('transform', 'rotate(90)')
          .style('text-anchor', 'end');
      }
    }
    if (y) {
      d3.select(`#${id}-axis-y`)
        .call(d3.axisLeft(y)
          .ticks(5)
          .tickSize(-dim.w)
          .tickPadding(6)
          .tickFormat((d, i) => `${d} ${i === 0 && pos !== 'bottom' ? ' TWEETS': ''}`)
        );
      if (id === 'timeline') {
        d3.select(`#${id}-axis-y`).selectAll('text')
          .attr('y', 0)
          .attr('x', 0)
          .attr('dy', 4)
          .style('text-anchor', 'start')
          .style('alignment-baseline', 'hanging');
      }
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
