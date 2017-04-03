import React, { Component } from 'react'
import * as d3 from 'd3'
import _ from 'underscore'
import moment from 'moment'

class Lines extends Component {

  componentDidMount() {
    let self = this;

    const line = d3.line()
      .x((d) => self.props.x(moment(d[0], 'YYYY-MM')))
      .y((d) => self.props.y(d[1]))
      .curve(d3.curveMonotoneX)

    const { mentions, category } = this.props;

    //show lines
    mentions.map((l, i) => {
      return d3.select('#flow-lines')
        .append('path')
        .datum(l.points)
        .attr('d', line)
        .attr('class', `normal${category[l.id] < 3 ? category[l.id] : ''} js-line-${l.id}`)
        .on('mouseover', function() {
          d3.select(this).classed('hovered', true);
          this.parentElement.appendChild(this);
          d3.select('#flow-stats')
            .html(`<strong>@${l.name}</strong> has received <strong>${l.count}</strong> mention${l.count > 1 ? 's' : ''} since <strong>${l.first}</strong>`);
        })
        .on('click', function() {
          self.props.selectFriend(l.id);
        })
        .on('mouseout', function() {
          d3.select(this).classed('hovered', false);
          d3.select('#flow-stats').html('');
        });
    });
  }

  render() {
    return (
      <g className="flow-lines" id="flow-lines"></g>
    );
  }
}

export default Lines