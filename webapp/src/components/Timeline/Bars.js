import React, { Component } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
import moment from 'moment'
import Axis from '../common/Axis'
import { Colors } from '../../helpers/colors'
import { TypeList } from '../../helpers/formatter'

class Bars extends Component {

  componentWillMount () {
    const containerW = document.getElementById('graph-full').clientWidth - 30;
    this.margin = {top: 40, right: 10, bottom: 10, left: 40};
    const timeDomain = [this.props.range[0].startOf('month'),
      this.props.range[1].add(1, 'month').startOf('month')];
    const countDomain = [0, _.max(this.props.all.map((d) => d[1]))];
    this.dim = {
      w: containerW - this.margin.left - this.margin.right,
      h: 200 - this.margin.top - this.margin.bottom
    };
    this.x = d3.scaleTime().domain(timeDomain).range([0, this.dim.w]);
    this.y = d3.scaleLinear().domain(countDomain).range([0, this.dim.h]);
  }

  getBarWidth(x, p) {
    return x(moment(p, 'YYYY-MM').add(32, 'days').startOf('month'))
      - x(moment(p, 'YYYY-MM')) -1;
  }

  componentWillReceiveProps(nextProps) {

    //when the view changes from all to category, and change between category
    if ((this.props.view === 'all' && nextProps.view === 'category') ||
        (this.props.category !== nextProps.category)) {

      const category = nextProps.category;
      const types = TypeList[category];
      const data = this.props[category].map((d) => {
          const obj = { month: d[0] };
          _.forEach(types, (t, i) => (obj[t] = d[1][i]));
          return obj;
        }
      );

      const self = this;

      d3.select('#timeline-category').html('')
        .selectAll('g')
        //order types descending
        .data(d3.stack().order(d3.stackOrderDescending).keys(types)(data))
        .enter().append('g')
          .attr('fill', (d) => Colors[d.key])
        .selectAll('rect')
        .data((d) => d)
        .enter().append('rect')
          .attr('x', (d) => self.x(moment(d.data.month, 'YYYY-MM')))
          .attr('y', (d) => self.y(d[0]))
          .attr('height', (d) => self.y(d[1]) - self.y(d[0]))
          .attr('width', (d) => this.getBarWidth(self.x, d.data.month));
        }
    }


  render () {
    const bars = this.props.all.map((d) =>
      <rect
        x={this.x(moment(d[0], 'YYYY-MM'))}
        y='0'
        width={this.getBarWidth(this.x, d[0])}
        height={this.y(d[1])}
        key={d[0]}
      />
    )

    return (
      <svg
        width={this.dim.w + this.margin.left + this.margin.right}
        height={this.dim.h + this.margin.top + this.margin.bottom}
      >
        <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
          { //all tweets
            bars }
          { //selected tweets
            <g id="timeline-category" />
          }
          <Axis x={this.x} y={this.y} dim={this.dim} {...this.props} id="timeline"/>
          {!_.isEmpty(this.props.selectedRange) &&
            //show brush
            <rect
              x={this.x(moment(this.props.selectedRange[0], 'YYYY-MM-DD'))}
              y='0'
              width={this.x(moment(this.props.selectedRange[1], 'YYYY-MM-DD'))
               - this.x(moment(this.props.selectedRange[0], 'YYYY-MM-DD'))}
              height={this.dim.h}
              className='timeline-brush'
            ></rect>}
        </g>
      </svg>
    );
  }
}

export default Bars