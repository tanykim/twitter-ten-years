import React, { Component } from 'react'
import _ from 'lodash'
import * as d3 from 'd3'
import moment from 'moment'

class Dots extends Component {

  componentWillUpdate(nextProps) {
    let self = this;
    if (!_.isEmpty(nextProps.friend)) {
      d3.selectAll('.js-flow-dots').remove();
      const g = d3.select('#flow-dots');
      g.selectAll('.js-flow-dots')
        .data(nextProps.friend.points)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
          return self.props.x(moment(d[0], 'YYYY-MM'));
        })
        .attr('cy', function(d) {
          return self.props.y(d[1])
        })
        .attr('r', 3)
        .attr('class', 'flow-dots js-flow-dots');
    }
  }

  render() {
    return (
      <g className="dots" id="flow-dots"></g>
    );
  }
}

export default Dots
