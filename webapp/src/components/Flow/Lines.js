import React, { Component } from 'react'
import * as d3 from 'd3'
import _ from 'underscore'
import moment from 'moment'

class Lines extends Component {

  componentDidMount() {
    let self = this;
    const line = d3.line()
      .x(function(d) { return self.props.x(moment(d[0], 'YYYY-MM')); })
      .y(function(d) { return self.props.y(d[1]); })
      .curve(d3.curveMonotoneX)

    const { mentions, category } = this.props;

    //show lines that has at least 2 data points
    const validLines = _.filter(mentions, function (d) {
      return d.points.length > 1;
    });
    validLines.map((l, i) => {
      return d3.select('#flow-lines')
        .append('path')
        .datum(l.points)
        .attr('d', line)
        .attr('class', `normal${category[l.id] < 3 ? category[l.id] : ''} flow-line-${l.id}`)
        .on('mouseover', function() {
          d3.select(this).classed('highlighted', true);
          this.parentElement.appendChild(this);
          d3.select('#flow-stats')
            .html(`@${l.name}: ${l.count} mentions <br/> First mention: ${l.first}`);
        })
        .on('click', function() {
          self.props.selectFriend(l.id);
        })
        .on('mouseout', function() {
          d3.select(this).classed('highlighted', false);
          d3.select('#flow-stats').html('');
        });
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.friend.id !== this.props.friend.id) {
      d3.select(`.flow-line-${this.props.friend.id}`).classed('selected', false);
      d3.select(`.flow-line-${nextProps.friend.id}`).classed('highlighted', false);
      d3.select(`.flow-line-${nextProps.friend.id}`).classed('selected', true);
      d3.select('#flow-stats').html('');
      // TODO: move the line to the front
    }

  }

  render() {
    return (
      <g className="lines" id="flow-lines"></g>
    );
  }
}

export default Lines