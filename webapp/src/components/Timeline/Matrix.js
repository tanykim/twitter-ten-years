import React, { Component } from 'react'
import _ from 'lodash'
import * as d3 from 'd3'
import { getWeekday, getAmPm, TypeList } from '../../helpers/formatter'
import { Colors } from '../../helpers/colors'

class Matrix extends Component {

  constructor(props) {
    super()
    this.onMatrixViewChanged = this.onMatrixViewChanged.bind(this);
  }

  onMatrixViewChanged(e) {
    this.props.changeMatrixView(e.currentTarget.value);
  }

  componentWillMount () {
    const containerW = document.getElementById('graph-qt').clientWidth * 3 - 30;
    this.margin = {top: 40, right: 20, bottom: 10, left: 60};
    const w = containerW - this.margin.left - this.margin.right;
    //width and height of square
    this.sq = w / 24;
    const h = this.sq * 7;
    this.dim = { w, h };
  }

  showDayBars(types, data) {
    const self = this;
    const x = d3.scaleLinear().range([0, self.dim.w]).domain([0, _.max(this.props.sum.day)]);

    d3.select('#matrix-category').html('')
      .selectAll('g')
      //order types descending
      .data(d3.stack().keys(types)(data))
      .enter().append('g')
        .attr('fill', (d) => Colors[d.key])
      .selectAll('rect')
      .data((d) => d)
      .enter().append('rect')
        .attr('x', (d) => x(d[0]))
        .attr('y', (d) => self.sq * d.data.id)
        .attr('height', self.sq)
        .attr('width', (d) => x(d[1]) - x(d[0]));
  }

  showHourBars(types, data) {
    const self = this;
    const y = d3.scaleLinear().range([self.dim.h, 0]).domain([0, _.max(this.props.sum.hour)]);

    d3.select('#matrix-category').html('')
      .selectAll('g')
      //order types descending
      .data(d3.stack().keys(types)(data))
      .enter().append('g')
        .attr('fill', (d) => Colors[d.key])
      .selectAll('rect')
      .data((d) => d)
      .enter().append('rect')
        .attr('x', (d) => self.sq * d.data.id)
        .attr('y', (d) => y(d[1]))
        .attr('height', (d) => y(d[0]) - y(d[1]))
        .attr('width', self.sq);
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.view === 'all' && nextProps.view === 'category') ||
        (this.props.matrix !== nextProps.matrix) ||
        (this.props.category !== nextProps.category)) {

      const category = nextProps.category;
      const types = TypeList[category];
      const view = nextProps.matrix;

      //make stack data
      const data = this.props.matrixType[view].map((d) => {
          const obj = { id: d[0] };
          //original data keys are only in the first letter
          //if the key does not exist, return 0
          let sum = 0;
          _.forEach(types, (t) => {
            const val = d[1][t.charAt(0).toLowerCase()] || 0;
            obj[t] = val;
            sum += val
          });
          //substract all key values from the total and add
          //for the stacked bar with length of total value
          return _.assignIn({rest: this.props.sum[view][d[0]] - sum }, obj);
        }
      );

      //add more type for stacked graph
      const allTypes = _.concat(types, 'rest');

      if (view === 'day') {
        this.showDayBars(allTypes, data);
      } else {
        this.showHourBars(allTypes, data);
      }
    } else if (nextProps.view === 'all') {
      d3.select('#matrix-category').html('');
    }
  }

  render () {

    const days = _.range(7).map((i) => (
      <text x="0" y={i * this.sq + this.sq / 2} className="weekday" key={i}>{getWeekday(i)}</text>
    ));

    const hours = _.range(25).map((i) => (
      <text x={i * this.sq} y={this.dim.h} className="hour" key={i}>{getAmPm(i)}</text>
    ));

    const squares = this.props.byDayHour.map((day, i) => (
      <g key={i}>
          {day.map((hour, j) =>
            <rect
              x={j * this.sq}
              y={i * this.sq}
              width={this.sq}
              height={this.sq}
              style={{fill: 'black', opacity: hour / this.props.max}}
              key={j}
          />)}
      </g>)
    )

    return (
      <div className="matrix-wrapper">
        { this.props.view === 'category' && ['day', 'hour'].map((view) => <span key={view}>
              <input
                type="radio"
                name="matrix"
                value={view}
                checked={this.props.matrix === view}
                onChange={this.onMatrixViewChanged}
              /> { view === 'day' ? 'By Day' : 'By Hour'}
          </span>) }
        <svg
          width={this.dim.w + this.margin.left + this.margin.right}
          height={this.dim.h + this.margin.top + this.margin.bottom}
        >
          <g transform={`translate(${this.margin.left}, ${this.margin.right})`}>
            { (this.props.view === 'all' || this.props.matrix === 'day') && <g>{days}</g> }
            { (this.props.view === 'all' || this.props.matrix === 'hour') && <g>{hours}</g> }
            { this.props.view === 'all' && squares }
            <g id="matrix-category"></g>
          </g>
        </svg>
      </div>
    )
  }
}

export default Matrix