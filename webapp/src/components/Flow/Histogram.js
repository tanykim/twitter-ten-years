import React, { Component } from 'react'
import _ from 'lodash'
import * as d3 from 'd3'

const RankBar = (props) => {
  const ratio = Math.floor(props.data[props.type] / props.data.total * 10);
  return (<div className="ranking-graph">
    {_.range(10).map((i) => <div className={`line${i >= ratio ? '-filled' : ''}`} key={i}></div>)}
  </div>)
}

class Histogram extends Component {

  componentWillMount () {
    const containerW = document.getElementById('graph-third').clientWidth - 60;
    this.margin = {top: 10, right: 20, bottom: 40, left: 40};
    this.dim = {
      w: containerW - this.margin.left - this.margin.right,
      h: 200 - this.margin.top - this.margin.bottom
    };
  }

  componentDidMount() {
    let self = this;
    const data = self.props.data;
    const dataRange = d3.extent(data);
    const x = d3.scaleLinear().range([0, self.dim.w]).domain(dataRange);
    const bins = d3.histogram()
      .domain(x.domain())
      .thresholds(x.ticks(20))(data);

    // update x domain to set max as the rounded-up number
    const secondLastBin = bins[bins.length - 2];
    const max = secondLastBin.x1 + (secondLastBin.x1 - secondLastBin.x0);
    bins[bins.length - 1].x1 = max;
    x.domain([dataRange[0], max]);
    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, function(d) { return d.length; })])
      .range([self.dim.h, 0]);

    const g = d3.select(`#flow-histogram-${self.props.type}`);

    //bars
    const barW = x(bins[0].x1) - x(bins[0].x0);
    g.selectAll(`.js-flow-histogram-${self.props.type}-bars`)
      .data(bins)
      .enter()
      .append('rect')
      .attr('class', `js-flow-histogram-${self.props.type}-bars elm-grey-rest`)
      .attr('x', function(d) {
        return x(d.x0) + 1;
      })
      .attr('y', function(d) {
        return y(d.length);
      })
      .attr('width', barW - 1)
      .attr('height', function(d) {
        return self.dim.h - y(d.length)
      });

    //curve
    const line = d3.line()
      .x(function(d) { return x(d.x0); })
      .y(function(d) { return y(d.length); })
      .curve(d3.curveMonotoneX);
    g.append('path')
      .datum(bins)
      .attr('d', line)
      .attr('class', 'histogram-curve');

    //selected friend location
    g.append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', self.dim.h)
      .attr('class', `js-histogram-${self.props.type}-line l-selected`);
    g.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 0)
      .attr('height', self.dim.h)
      .attr('class', `js-histogram-${self.props.type}-area a-selected`);
    g.append('text')
      .attr('x', -self.dim.h / 2)
      .attr('dy', 10)
      .attr('transform', 'rotate(-90)')
      .attr('class', `js-histogram-${self.props.type}-text t-selected`);

    //axis
    g.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${self.dim.h})`)
      .call(d3.axisBottom(x)
        .ticks(5));
    g.append('text')
      .attr('class', 'label-x')
      .attr('transform', `translate(${self.dim.w / 2},${self.dim.h + self.margin.bottom - 5})`)
      .text(self.props.label);
    g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickSize(-self.dim.w));
    g.append('text')
      .attr('x', -this.dim.h / 2)
      .attr('y', -this.margin.left)
      .attr('transform', 'rotate(-90)')
      .attr('class', 'label-y')
      .text('Number of Friends');

    this.x = x;
  }

  componentWillReceiveProps(nextProps) {
    //show friend status line over the histogram
    if (!_.isEmpty(nextProps.friend)) {
      const f = nextProps.friend;
      const t = this.props.type;
      d3.select(`.js-histogram-${t}-line`)
        .classed(`c-${this.props.friend.category}`, false)
        .classed(`c-${f.category}`, true)
        .transition()
        .style('opacity', 1)
        .attr('x1', this.x(f[t]))
        .attr('x2', this.x(f[t]));
      d3.select(`.js-histogram-${t}-area`)
        .classed(`c-${this.props.friend.category}`, false)
        .classed(`c-${f.category}`, true)
        .transition()
        .attr('x', this.x(f[t]))
        .attr('width', this.dim.w - this.x(f[t]));
      d3.select(`.js-histogram-${t}-text`)
        .classed(`c-${this.props.friend.category}`, false)
        .classed(`c-${f.category}`, true)
        .text(`@${f.name}`)
        .transition()
        .attr('y', this.x(f[t]));
    }
  }

  render () {
    const f = this.props.friend;
    // const r = f.ranking;
    const t = this.props.type;

    return (
      <div className={`histogram-wrapper ${t}`}>
        <div className="histogram-title">{this.props.label.split('of ')[1]}</div>
        <svg
          width={this.dim.w + this.margin.left + this.margin.right}
          height={this.dim.h + this.margin.top + this.margin.bottom}
        >
          <g
            transform={`translate(${this.margin.left}, ${this.margin.top})`}
            id={`flow-histogram-${t}`}
          />
        </svg>
        { !_.isEmpty(f) &&
          <div className={`ranking-wrapper c-${f.category}`}>
            <div className="percentage"> Top <strong>{Math.ceil(f.ranking[t] / f.ranking.total * 1000) / 10}</strong>%</div>
            <div className="ranking"><div>{f.ranking[t]}</div><div>{f.ranking.total}</div></div>
            <RankBar type={t} data={f.ranking} />
          </div>}
        <table>
          <thead>
            <tr>
              <th className="rank">#</th>
              <th>Top Friends</th>
              <th className="number">{this.props.unit}</th>
            </tr>
          </thead>
          <tbody>
            { this.props.ranking.slice(0, 10).map((friend, i) => (<tr key={i}
              className={f.ranking && f.ranking[t] === i + 1 ? `selected c-${f.category}` : ''}>
                <th>{i + 1}</th>
                <td className="name"
                  onClick={() => this.props.selectFriend(friend[0])}
                >
                  @{friend[1]}
                </td>
                <td className="number">{friend[2]}</td>
              </tr>)
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Histogram