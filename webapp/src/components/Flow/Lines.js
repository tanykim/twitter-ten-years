import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'underscore';
import moment from 'moment';

console.log('--------lines.js');

class Lines extends Component {

  componentDidMount() {
    let self = this;

    const line = d3.line()
      .x(function(d) { return self.props.x(moment(d[0], 'YYYY-MM')); })
      .y(function(d) { return self.props.y(d[1]); });

    //show lines that has at least 2 data points
    const validLines = _.filter(this.props.lines, function (d) {
      return d.points.length > 1;
    });
    validLines.map((l, i) => {
      return d3.select('#flow-lines')
        .append('path')
        .datum(l.points)
        .attr('d', line)
        .style('stroke', l.selected ? 'red' : 'black')
        .style('fill', 'none');
    });
  }

  render() {
    return (
      <g className="lines" id="flow-lines"></g>
    )
  }
}

export default Lines;
