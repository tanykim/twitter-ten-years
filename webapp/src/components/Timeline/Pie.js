import React, { Component } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'

class Pie extends Component {

  constructor(props) {
    super();
    this.onCategoryChanged = this.onCategoryChanged.bind(this);
  }

  onCategoryChanged(val) {
    this.props.changeCategory(val);
  }

  componentWillMount () {
    const containerW = document.getElementById('graph-qt').clientWidth - 30;
    const w = containerW * 0.8;
    const h = w;
    this.dim = { w, h, r: w / 2 };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.category !== nextProps.category) {
      //change old pie to grey scale
      if (this.props.category === this.props.label) {
        _.forEach(this.props.data, (d, i) =>
          d3.select(`#g-pie-${this.props.category}`).select(`.js-arc-${i}`)
            .classed(`elm-grey-${i === this.props.data.length - 1 ? 'rest' : i}`, true)
            .classed(`elm-${d[0].split(' ')[0]}`, false)
        );
      }
      //change new pie to color scale
      if (nextProps.category === nextProps.label) {
        _.forEach(nextProps.data, (d, i) =>
            d3.select(`#g-pie-${nextProps.category}`).select(`.js-arc-${i}`)
              .classed(`elm-grey-${i === nextProps.data.length - 1 ? 'rest' : i}`, false)
              .classed(`elm-${d[0].split(' ')[0]}`, true)
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
        .attr('class', (d, i) => {
          return `js-arc-${i} elm-${this.props.category === this.props.label ?
            d.data[0].split(' ')[0] :
            'grey-' + (i === data.length - 1 ? 'rest' : i)}`
        });

    //label of category e.g., interaction
    g.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .text(this.props.label)
      .attr('class', 'label')
      .on('click', () => this.onCategoryChanged(this.props.label));
  }

  render () {

    //put legend except "rest"
    const legends = this.props.data
      .map((d, i) => <tr key={d[0]} className="pie-legend">
        <td>
          <div className={`type-color legend-${this.props.category === this.props.label ?
            d[0].split(' ')[0] :
            'grey-' + (i === this.props.data.length - 1 ? 'rest' : i)}`} />
        </td>
        <td className="type-label">{d[0]}</td>
        <td className="type-percent">{(d[1] / this.props.total * 100).toFixed(1)}%</td>
        <td>({d[1]} tweet{d[1] > 1 ? 's' : ''})</td>
      </tr>);

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
        <table className="legend-wrapper">
          <tbody>{legends}</tbody>
        </table>
      </div>
    );
  }
}

export default Pie