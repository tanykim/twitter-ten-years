import React, { Component } from 'react'
import * as d3 from 'd3'
import _ from 'underscore'
import moment from 'moment'
import { connect } from 'react-redux'
import { selectFriend } from '../../actions'

class Lines extends Component {

  componentDidMount() {
    let self = this;
    const line = d3.line()
      .x(function(d) { return self.props.x(moment(d[0], 'YYYY-MM')); })
      .y(function(d) { return self.props.y(d[1]); })
      .curve(d3.curveMonotoneX)

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
          d3.select('#flow-stats')
            .html(`@${l.name}: ${l.count} mentions <br/> First mention: ${l.first.text} at ${l.first.at}`);
        })
        .on('click', function() {
          //update prop
          return self.props.dispatch(selectFriend(l.id));
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
      d3.select(`.flow-line-${nextProps.selectedFriend}`).classed('highlighted', false);
      d3.select(`.flow-line-${nextProps.selectedFriend}`).classed('selected', true);
      d3.select('#flow-stats').html('');
      //this.showFriendInfo(l);
      // TODO: move the line to the front
    }

  }

  render() {
    return (
      <g className="lines" id="flow-lines"></g>
    );
  }
}

Lines = connect()(Lines)

export default Lines
