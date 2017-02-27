import React, { Component } from 'react'
import * as d3 from 'd3'
import _ from 'underscore'
import moment from 'moment'

class Lines extends Component {

  showFriendInfo(l) {
    d3.select('#flow-stats')
      .html(`@${l.name}: ${l.count} mentions <br/> First mention: ${l.first.text} at ${l.first.at}`);
  }

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
        .attr('class', `normal flow-line-${l.id}`)
        .on('mouseover', function() {
          d3.select(this).classed('highlighted', true);
          this.parentElement.appendChild(this);
          self.showFriendInfo(l);
        })
        .on('mouseout', function() {
          d3.select(this).classed('highlighted', false);
          d3.select('#flow-stats').html('');
        });
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.selectedFriend !== this.props.selectedFriend) {
      d3.select(`.flow-line-${this.props.selectedFriend}`).classed('selected', false);
      d3.select(`.flow-line-${nextProps.selectedFriend}`).classed('selected', true);
      d3.select('#flow-stats').html('');
      const l = _.filter(this.props.lines, function (d) {
        return d.id === nextProps.selectedFriend;
      })[0];
      this.showFriendInfo(l);
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