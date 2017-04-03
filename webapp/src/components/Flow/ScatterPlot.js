import React, { Component } from 'react'
import _ from 'lodash'
import * as d3 from 'd3'
import { getSinceText } from '../../helpers/formatter'

class ScatterPlot extends Component {

  componentWillMount () {
    const containerW = document.getElementById('graph-half').clientWidth - 60;
    this.margin = {top: 20, right: 20, bottom: 40, left: 40};
    this.dim = {
      w: containerW - this.margin.left - this.margin.right,
      h: containerW - this.margin.top - this.margin.bottom
    };

    const histogram = this.props.histogram;
    const cRange = d3.extent(histogram.count);
    const dRange = d3.extent(histogram.duration);
    this.x = d3.scaleLinear().range([0, this.dim.w]).domain(cRange);
    this.y = d3.scaleLinear().range([this.dim.h, 0]).domain(dRange);
  }

  componentDidMount() {

    const { mentions, category, friend } = this.props;

    const g = d3.select(`#flow-scatterPlot`)

    let self = this;

    //selected friend rect
    g.append('rect')
      .attr('x', 0)
      .attr('y', this.dim.h)
      .attr('width', 0)
      .attr('height', 0)
      .attr('id', 'scatterPlot-area')
      .attr('class', 'friend-area');

    //dots
    g.selectAll('circle')
      .data(mentions)
      .enter()
      .append('circle')
      .attr('cx', (d) => this.x(d.count))
      .attr('cy', (d) => this.y(d.duration))
      .attr('r', 4)
      .attr('class', (d) => `dot js-dot-${d.id} elm-friend-${category[d.id]}`)
      .attr('id', (d) => `dot-${d.id}`)
      .on('mouseover', function(d) {
        d3.select(this).classed('hovered', true);
        const since = getSinceText(d.duration);
        d3.select('#scatterPlot-hover')
          .html(`<strong>@${d.name}</strong> has been received <strong>${d.count}</strong> mention${d.count > 1 ? 's' : ''} ${since}`);
      })
      .on('click', function(d) {
        self.props.selectFriend(d.id);
      })
      .on('mouseout', function(d) {
        d3.select(this).classed('hovered', false);
        d3.select('#scatterPlot-hover').html('');
      });

    //selected friend location
    g.append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', self.dim.h)
      .attr('id', 'scatterPlot-count')
      .attr('class', 'friend-line')
    g.append('line')
      .attr('x1', 0)
      .attr('x2', self.dim.w)
      .attr('y1', self.dim.h)
      .attr('y2', self.dim.h)
      .attr('id', 'scatterPlot-duration')
      .attr('class', 'friend-line')

    //axis
    g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + this.dim.h + ')')
      .call(d3.axisBottom(this.x));
    g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(this.y));

    //if friend is selected
    if (friend.id) {
      this.highlightFriend(friend);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.friend.id !== this.props.friend.id) {
      //deselect previous one
      d3.select(`.js-dot-${this.props.friend.id}`).classed('selected', false).attr('r', 4);
      this.highlightFriend(nextProps.friend);
    }
  }

  highlightFriend(friend) {

    //highlight the dot
    const s = d3.select(`.js-dot-${friend.id}`);
    s.classed('selected', true).attr('r', 8);

    //move to front
    d3.selection.prototype.moveToFront = function() {
      return this.each(function() {
        this.parentNode.appendChild(this);
      });
    };
    s.moveToFront();

    //show ranking lines
    d3.select(`#scatterPlot-count`)
      .transition()
      .attr('x1', this.x(friend.count))
      .attr('x2', this.x(friend.count));
    d3.select(`#scatterPlot-duration`)
      .transition()
      .attr('y1', this.y(friend.duration))
      .attr('y2', this.y(friend.duration));
    d3.select('#scatterPlot-area')
      .transition()
      .attr('width', this.x(friend.count))
      .attr('y', this.y(friend.duration))
      .attr('height', this.dim.h - this.y(friend.duration));

  }

  render () {
    return (
      <div className="vis-bg scatterPlot-wrapper">
        <div className="option">
          <div className="title"><span className="number">Option 4</span> Select a friend in count-duration plot </div>
          <div className="desc" id="scatterPlot-hover"></div>
        </div>
        <svg
          width={this.dim.w + this.margin.left + this.margin.right}
          height={this.dim.h + this.margin.top + this.margin.bottom}
        >
          <g
            transform={`translate(${this.margin.left}, ${this.margin.top})`}
            id="flow-scatterPlot"
            ref="scatterPlot"
          />
        </svg>
      </div>
    );
  }
}

export default ScatterPlot