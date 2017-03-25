import React, { Component } from 'react'
import * as d3 from 'd3'
import { Colors } from '../../helpers/colors'

class Pie extends Component {

  componentWillMount () {
    const containerW = document.getElementById('graph-qt').clientWidth - 30;
    const w = containerW;
    const h = w;
    this.dim = { w, h, r: w / 2 };
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
        .attr('fill', (d) => Colors[d.data[0]]);

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
      .map((d) => <div key={d[0]} className="pie-legend">
        <div className="type-label" style={{backgroundColor: Colors[d[0]]}}></div>
        <div>{d[0]} ({d[1]}, {(d[1] / this.props.total * 100).toFixed(1)}%)</div>
      </div>);

    return (
      <div className="pie-wrapper">
        <svg
          width={this.dim.w}
          height={this.dim.h}
        >
          <g
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