import React, { Component } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
import { Colors, Grey } from '../../helpers/colors'

class Pie extends Component {

  componentWillMount () {
    const containerW = document.getElementById('graph-qt').clientWidth - 30;
    const w = containerW;
    const h = w;
    this.dim = { w, h, r: w / 2 };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.category !== nextProps.category) {
      //change old pie to grey scale
      if (this.props.category === this.props.label) {
        _.forEach(this.props.data, (d, i) =>
          d3.select(`#g-pie-${this.props.category}`).select(`.arc-${i}`).style('fill', Grey[i])
        );
      }
      //change new pie to color scale
      if (nextProps.category === nextProps.label) {
        _.forEach(nextProps.data, (d, i) =>
          d3.select(`#g-pie-${nextProps.category}`).select(`.arc-${i}`).style('fill', Colors[d[0]])
        );
      }
    }
  }

  componentDidMount() {
    const data = this.props.data;

    const g = d3.select(`#g-pie-${this.props.label}`)

    const pie = d3.pie()
      .sort(null)
      .value((d) => d[1]);
    const path = d3.arc()
      .outerRadius(this.dim.r - 2)
      .innerRadius(60);

    let arc = g.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    arc.append('path')
        .attr('d', path)
        //d[0] is the label of type, e.g., mention
        .style('fill', (d, i) =>
          this.props.category === this.props.label ?
          Colors[d.data[0]] :
          Grey[i]
        )
        .attr('class', (d, i) => `arc-${i}`);

    //label of category e.g., interaction
    g.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .text(this.props.label)
      .attr('class', 'label');
  }

  render () {

    //put legend except "rest"
    const legends = this.props.data.slice(0, this.props.data.length - 1)
      .map((d, i) => <div key={d[0]} className="pie-legend">
        <div
          className="type-label"
          style={ { backgroundColor: (this.props.category === this.props.label ?
            Colors[d[0]] :
            Grey[i] ) } } />
        <div>{d[0]} ({d[1]}, {(d[1] / this.props.total * 100).toFixed(1)}%)</div>
      </div>);

    return (
      <div className="pie-wrapper">
        <svg
          width={this.dim.w}
          height={this.dim.h}
        >
          <g
            className="pie-g"
            id={`g-pie-${this.props.label}`}
            transform={`translate(${this.dim.r}, ${this.dim.r})`}
          />
        </svg>
        <div className="legend-wrapper">
          {legends}
        </div>
      </div>
    );
  }
}

export default Pie