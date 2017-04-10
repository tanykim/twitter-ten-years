import React, { Component } from 'react'
import _ from 'lodash'
import * as d3 from 'd3'
import Axis from '../common/Axis'
import { getWeekday, getAmPm, TypeList } from '../../helpers/formatter'

class Matrix extends Component {

  constructor(props) {
    super()
    this.onMatrixViewChanged = this.onMatrixViewChanged.bind(this);
  }

  onMatrixViewChanged(view) {
    this.props.changeMatrixView(view);
  }

  componentWillMount () {
    let containerW = document.getElementById('graph-3qt').clientWidth - 30;
    containerW = Math.max(containerW, 800);

    this.margin = { top: 15, right: 20, bottom: 32, left: 60 };
    const w = containerW - this.margin.left - this.margin.right;
    //width and height of square
    this.sq = w / 24;
    const h = this.sq * 7;
    this.dim = { w, h };
    this.x = d3.scaleLinear().range([0, this.dim.w]).domain([0, _.max(this.props.sum.day)]);
    this.y = d3.scaleLinear().range([this.dim.h, 0]).domain([0, _.max(this.props.sum.hour)]);
  }

  showDayBars(types, data) {
    const self = this;

    d3.select('#matrix-category').html('')
      .selectAll('g')
      //order types descending
      .data(d3.stack().keys(types)(data))
      .enter().append('g')
        .attr('class', (d) => `elm-${d.key.split(' ')[0]}`)
      .selectAll('rect')
      .data((d) => d)
      .enter().append('rect')
        .attr('x', (d) => self.x(d[0]))
        .attr('y', (d) => self.sq * d.data.id + 2)
        .attr('height', self.sq - 4)
        .attr('width', (d) => self.x(d[1]) - self.x(d[0]));
  }

  showHourBars(types, data) {
    const self = this;

    d3.select('#matrix-category').html('')
      .selectAll('g')
      //order types descending
      .data(d3.stack().keys(types)(data))
      .enter().append('g')
        .attr('class', (d) => `elm-${d.key.split(' ')[0]}`)
      .selectAll('rect')
      .data((d) => d)
      .enter().append('rect')
        .attr('x', (d) => self.sq * d.data.id + 2)
        .attr('y', (d) => self.y(d[1]))
        .attr('height', (d) => self.y(d[0]) - self.y(d[1]))
        .attr('width', self.sq - 4);
  }

  drawMatrix(props) {
    d3.select('#matrix-category').html('');
    props.byDayHour.map((day, i) =>
      day.map((hour, j) =>
        d3.select('#matrix-none')
          .append('rect')
          .attr('x', j * this.sq + 1)
          .attr('y', i * this.sq + 1)
          .attr('width', this.sq - 1)
          .attr('height', this.sq - 1)
          .attr('rx', 2)
          .attr('ry', 2)
          .attr('class', 'square')
          .style('fill-opacity', hour / props.max)
      )
    )
  }

  getStackedBarData(props) {
    const category = props.category;
    const types = TypeList[category];
    const validTypes = types.slice(0, types.length - 1);
    const lastType = types[types.length - 1];
    const view = props.matrix;

    //make stack data
    const data = props.matrixType[view].map((d) => {
        const obj = { id: d[0] };
        //original data keys are only in the first letter
        //if the key does not exist, return 0
        let sum = 0;
        _.forEach(validTypes, (t) => {
          const val = d[1][t.charAt(0).toLowerCase()] || 0;
          obj[t] = val;
          sum += val
        });
        //substract all key values from the total and add
        //for the stacked bar with length of total value
        return _.assignIn({[lastType]: props.sum[view][d[0]] - sum }, obj);
      }
    );

    return { types, data };
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.matrix !== nextProps.matrix) ||
        (nextProps.category !== 'none' && this.props.category !== nextProps.category)) {
      const { types, data } = this.getStackedBarData(nextProps);
      d3.select('#matrix-none').html('');
      if (nextProps.matrix === 'day') {
        this.showDayBars(types, data);
      } else {
        this.showHourBars(types, data);
      }
    } else if (this.props.category !== 'none' && nextProps.category === 'none') {
      this.drawMatrix(nextProps);
    }
  }

  componentDidMount() {
    if (this.props.category === 'none') {
      this.drawMatrix(this.props);
    } else {
      const { types, data } = this.getStackedBarData(this.props);
      if (this.props.matrix === 'day') {
        this.showDayBars(types, data);
      } else {
        this.showHourBars(types, data);
      }
    }
  }

  render () {

    const { category, matrix, max } = this.props;
    const { dim, margin } = this;

    const days = _.range(7).map((i) => (
      <text x="-6" y={i * this.sq + this.sq / 2} className="axis-label-x" key={i}>{getWeekday(i)}</text>
    ));

    const hours = _.range(25).map((i) => (
      <text x={i * this.sq} y={dim.h} dy={6} className="axis-label-y" key={i}>{getAmPm(i)}</text>
    ));

    return (<div className="row matrix-wrapper"><div className="col-xs-12">
      <div className="vis-bg">

        { category !== 'none' && <ul className="list-inline">
          {['day', 'hour'].map((view) => (<li key={view}>
              <span
                className={`matrix-select${matrix === view ? ' selected' : ''}`}
                onClick={() => this.onMatrixViewChanged(view)}>
              By {view} </span>
          </li>))}
        </ul>}

        { category === 'none' && <div className="matrix-legend">
          <span>0</span>
          <span className="gradation"></span>
          <span>{max} tweets</span>
        </div>}
        <div className="svg-wrapper-scrolled">
          <svg
            width={dim.w + margin.left + margin.right}
            height={dim.h + margin.top + margin.bottom}
          >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              { (category === 'none' || matrix === 'day') &&
                <g className="axis">
                  {days}
                </g> }
              { (category === 'none' || matrix === 'hour') &&
                <g className="axis">
                  {hours}
                </g> }
              <g id="matrix-none" />
              <g id="matrix-category" />
              { category !== 'none' && matrix === 'day' && <g>
                <Axis x={this.x} dim={dim} id="matrix-day"/>
                <line x1="0" x2="0" y1="0" y2={dim.h} />
                <text x={dim.w / 2} y={dim.h + margin.bottom} className="label-x">TWEETS</text>
              </g> }
              { category !== 'none' && matrix === 'hour' && <g>
                <Axis y={this.y} dim={dim} id="matrix-hour" pos="bottom"/>
                <line x1="0" x2={dim.w} y1={dim.h} y2={dim.h} />
                <text x={-dim.h / 2} y={-margin.left} className="label-y" transform="rotate(-90)">TWEETS</text>
              </g>}
            </g>
          </svg>
        </div>
      </div>
    </div></div>)
  }
}

export default Matrix