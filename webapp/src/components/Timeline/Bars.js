import React, { Component } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
import moment from 'moment'
import Axis from '../common/Axis'
import { TypeList } from '../../helpers/formatter'

class Bars extends Component {

  componentWillMount () {
    const containerW = document.getElementById('graph-full').clientWidth - 30;
    this.margin = {top: 10, right: 15, bottom: 10, left: 15};
    const timeDomain = [this.props.range[0].startOf('month'),
      this.props.range[1].add(1, 'month').startOf('month')];
    const countDomain = [0, _.max(this.props.all.map((d) => d[1]))];
    this.dim = {
      w: containerW - this.margin.left - this.margin.right,
      h: 260 - this.margin.top - this.margin.bottom
    };
    this.x = d3.scaleTime().domain(timeDomain).range([0, this.dim.w]);
    this.y = d3.scaleLinear().domain(countDomain).range([0, this.dim.h]);
    //make the total tweets by month to objects, to calculate Rest count later
    this.all = _.fromPairs(this.props.all);
  }

  getBarWidth(x, p) {
    return x(moment(p, 'YYYY-MM').add(32, 'days').startOf('month'))
      - x(moment(p, 'YYYY-MM')) -1;
  }

  showStackedBars(props) {
    const category = props.category;
    const types = TypeList[category];
    const validTypes = types.slice(0, types.length - 1);
    const lastType = types[types.length - 1];
    const data = this.props[category].map((d) => {
        const obj = { month: d[0] };
        let sum = 0;
        _.forEach(validTypes, (t, i) => {
          sum += d[1][i];
          obj[t] = d[1][i];
        });
        return _.assignIn({[lastType]: this.all[d[0]] - sum}, obj);
      }
    );

    const self = this;

    d3.select('#timeline-category').html('')
      .selectAll('g')
      //order types descending
      .data(d3.stack().keys(types)(data))
      .enter()
      .append('g')
        .attr('class', (d) => `elm-${d.key.split(' ')[0]}`)
      .selectAll('rect')
      .data((d) => d)
      .enter()
      .append('rect')
        .attr('x', (d) => self.x(moment(d.data.month, 'YYYY-MM')))
        .attr('y', (d) => self.y(d[0]))
        .attr('height', (d) => self.y(d[1]) - self.y(d[0]))
        .attr('width', (d) => self.getBarWidth(self.x, d.data.month));
  }

  showBars(props) {
    const self = this;
    d3.select('#timeline-none').html('')
      .selectAll('rect')
      .data(props.all)
      .enter()
      .append('rect')
      .attr('x', (d) => self.x(moment(d[0], 'YYYY-MM')))
      .attr('y', 0)
      .attr('width', (d) => self.getBarWidth(self.x, d[0]))
      .attr('height', (d) => self.y(d[1]))
      .attr('class', 'elm-none');
  }

  componentWillReceiveProps(nextProps) {
    //when the view changes from all to category, and change between category
    if (nextProps.category !== 'none' && this.props.category !== nextProps.category) {
      d3.select('#timeline-none').html('');
      this.showStackedBars(nextProps);
    } else if (this.category !== 'none' && nextProps.category === 'none') {
      d3.select('#timeline-category').html('');
      this.showBars(nextProps)
    }
  }

  componentDidMount() {
    if (this.props.category === 'none') {
      this.showBars(this.props);
    } else {
      this.showStackedBars(this.props);
    }
    const brush = d3.brushX()
      .extent([[0, -15], [this.dim.w, this.dim.h + 15]])
      .on('end', () => {
        if (!d3.event.sourceEvent) return; // Only transition after input.
        if (!d3.event.selection) return; // Ignore empty selections.
        const s = d3.event.selection;
        const newPoints = s.map(this.x.invert, this.x).map((p) =>
          moment(p).format('YYYY-MM-DD')
        );
        this.props.selectRange(newPoints);
      })
      .filter(() => {
        //stop brush while loading tweets
        return !this.props.isFetchingTweets;
      })

    const brushRange = this.props.selectedRange.map((r) => this.x(moment(r, 'YYYY-MM')));
    d3.select('#timeline-brush')
      .attr('class', 'brush')
      .call(brush)
      .call(brush.move, brushRange);
  }

  render () {
    return (<div className="row"><div className="col-xs-12">
      <div className="vis-bg bar-wrapper">
        <svg
          className="svg-bar"
          width={this.dim.w + this.margin.left + this.margin.right}
          height={this.dim.h + this.margin.top + this.margin.bottom}
        >
          <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
            <g id="timeline-none" />
            <g id="timeline-category" />
            <Axis x={this.x} y={this.y} dim={this.dim} id="timeline" />
          </g>
          <g id='timeline-brush'
            transform={`translate(${this.margin.left}, ${this.margin.top})`} />
        </svg>
      </div>
    </div></div>);
  }
}

export default Bars