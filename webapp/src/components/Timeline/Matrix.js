import React, { Component } from 'react'
import _ from 'lodash'
import { getWeekday, getAmPm} from '../../helpers/formatter'

class Matrix extends Component {

  componentWillMount () {
    const containerW = document.getElementById('graph-qt').clientWidth * 3 - 30;
    this.margin = {top: 40, right: 20, bottom: 10, left: 60};
    const w = containerW - this.margin.left - this.margin.right;
    //width and height of square
    this.sq = w / 24;
    const h = this.sq * 7;
    this.dim = { w, h };
  }

  render () {
    const squares = this.props.data.map((day, i) => (
      <g
        key={i}
        transform={`translate(${this.margin.left}, ${this.margin.right})`}>
          <text x="0" y={i * this.sq + this.sq / 2} className="weekday">{getWeekday(i)}</text>
          {day.map((hour, j) =>
            <rect
              x={j * this.sq}
              y={i * this.sq}
              width={this.sq}
              height={this.sq}
              style={{fill: 'black', opacity: hour / this.props.max}}
              key={j}
          />)}
          { i === 0 && <g>
            {_.range(24).map((j) => <text x={j * this.sq} y="0" className="hour" key={j}>{getAmPm(j)}</text>)}
            <text x={24 * this.sq} y="0" className="hour">12 PM</text>
          </g>}
      </g>)
    )
    return (
      <div className="matrix-wrapper">
        <svg
          width={this.dim.w + this.margin.left + this.margin.right}
          height={this.dim.h + this.margin.top + this.margin.bottom}
        >
          {squares}
        </svg>
      </div>
    )
  }
}

export default Matrix