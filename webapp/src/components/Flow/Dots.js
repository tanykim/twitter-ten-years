import React, { Component } from 'react'
import * as d3 from 'd3'
import moment from 'moment'

class Dots extends Component {

  // componentDidMount() {
  //   let self = this;
  //   const line = d3.line()
  //     .x(function(d) { return self.props.x(moment(d[0], 'YYYY-MM')); })
  //     .y(function(d) { return self.props.y(d[1]); })
  //     .curve(d3.curveMonotoneX)

  //   //show lines that has at least 2 data points
  //   const validLines = _.filter(this.props.lines, function (d) {
  //     return d.points.length > 1;
  //   });
  //   validLines.map((l, i) => {
  //     return d3.select('#flow-lines')
  //       .append('path')
  //       .datum(l.points)
  //       .attr('d', line)
  //       .attr('class', `normal flow-line-${l.id}`)
  //       .on('mouseover', function() {
  //         d3.select(this).classed('highlighted', true);
  //         this.parentElement.appendChild(this);
  //         d3.select('#flow-stats')
  //           .html(`@${l.name}: ${l.count} mentions <br/> First mention: ${l.first.text} at ${l.first.at}`);
  //       })
  //       .on('click', function() {
  //         //update prop
  //         return self.props.dispatch(selectFriend(l.id));
  //       })
  //       .on('mouseout', function() {
  //         d3.select(this).classed('highlighted', false);
  //         d3.select('#flow-stats').html('');
  //       });
  //   });
  // }

  componentWillUpdate(nextProps) {
    let self = this;
    if (nextProps.friend) {
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
    // const selectedId = nextProps.selectedFriend;
    // if (selectedId > 0 && selectedId !== this.props.selectedFriend) {
    //   const selected = _.filter(this.props.lines, function (d) {
    //     return d.id === selectedId;
    //   })[0];
    //   console.log(selected);
      // d3.select(`.flow-line-${this.props.selectedFriend}`).classed('selected', false);
      // d3.select(`.flow-line-${nextProps.selectedFriend}`).classed('highlighted', false);
      // d3.select(`.flow-line-${nextProps.selectedFriend}`).classed('selected', true);
      // d3.select('#flow-stats').html('');
      // //this.showFriendInfo(l);
      // TODO: move the line to the front
    // }

  }

  render() {
    // console.log(this.props.selectedFriend);
    return (
      <g className="dots" id="flow-dots"></g>
    );
  }
}

export default Dots
