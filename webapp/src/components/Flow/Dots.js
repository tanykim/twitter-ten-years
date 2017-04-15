import React, { Component } from 'react'
import _ from 'lodash'
import * as d3 from 'd3'
import moment from 'moment'
import { fillBlankMonths } from '../../helpers/formatter'

class Dots extends Component {

  componentWillReceiveProps(nextProps) {

    if (!_.isEmpty(nextProps.friend)) {

      const { x, y, friend } = nextProps;

      const g = d3.select('#flow-dots');
      g.html('');

      const points = fillBlankMonths(friend.points);

      const line = d3.line()
        .x((d) => x(moment(d[0], 'YYYY-MM')))
        .y((d) => y(d[1]))
        .curve(d3.curveMonotoneX)

      //draw selected line
      g.append('path')
        .datum(points)
        .attr('d', line)
        .attr('class', 'selected')

      //show dots only with valid data points
      g.selectAll('circle')
        .data(friend.points)
        .enter()
        .append('circle')
        .attr('cx', (d) => x(moment(d[0], 'YYYY-MM')))
        .attr('cy', (d) => y(d[1]))
        .attr('r', 3)
        .attr('class', `flow-dots elm-friend-${nextProps.friend.category}`);
    }
  }

  render() {
    return (
      <g id="flow-dots"></g>
    );
  }
}

export default Dots
