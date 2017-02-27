import React, { Component } from 'react'
import * as d3 from 'd3'

class Histogram extends Component {

  componentWillMount () {
    const containerW = document.getElementById('graph-half').clientWidth - 30;
    this.margin = {top: 10, right: 10, bottom: 40, left: 20};
    this.dim = {
      w: containerW - this.margin.left - this.margin.right,
      h: 300 - this.margin.top - this.margin.bottom
    };
  }

  componentDidMount() {
    let self = this;
    const data = self.props.histogram[self.props.type];
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

    const g = d3.select(`#flow-histogram-${self.props.type}`)

    //bars
    const barW = x(bins[0].x1) - x(bins[0].x0);
    g.selectAll(`.js-flow-histogram-${self.props.type}-bars`)
      .data(bins)
      .enter()
      .append('rect')
      .attr('class', `js-flow-histogram-${self.props.type}-bars`)
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
      .x(function(d) { return x(d.x1) - barW / 2; })
      .y(function(d) { return y(d.length); })
      .curve(d3.curveMonotoneX)
    g.append('path')
      .datum(bins)
      .attr('d', line)
      .attr('class', 'histogram-curve')

    //selected friend location
    g.append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', self.dim.h)
      .attr('class', `flow-histogram-${self.props.type}-line histogram-selected`)

    //axis
    g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + self.dim.h + ')')
      .call(d3.axisBottom(x));

    this.x = x;
  }

  componentWillUpdate(nextProps) {
    //show friend status line over the histogram
    if (nextProps.friend) {
      const f = nextProps.friend;
      const t = this.props.type;
      d3.select(`.flow-histogram-${t}-line`)
        .transition()
        .attr('x1', this.x(f[t]))
        .attr('x2', this.x(f[t]));
    }
  }

  render () {
    return (
      <svg
        width={this.dim.w + this.margin.left + this.margin.right}
        height={this.dim.h + this.margin.top + this.margin.bottom}
      >
        <g
          transform={`translate(${this.margin.left}, ${this.margin.top})`}
          id={`flow-histogram-${this.props.type}`}
        />
      </svg>
    );
  }
}

export default Histogram