import React, { Component } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
import { Colors } from '../../helpers/colors'

class Network extends Component {

  componentWillMount () {
    const containerW = document.getElementById('graph-half').clientWidth - 30;
    this.dim = {
      w: containerW,
      h: containerW
    };
  }

  componentDidMount() {

    const { network, category } = this.props;

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d) => d.id).distance(18))
      .force('collide', d3.forceCollide(8))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.dim.w / 2, this.dim.w / 2))
      .force('x', d3.forceX().strength(0.08))
      .force('y', d3.forceY().strength(0.08))

    const link = d3.select('#flow-network').append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(network.links)
      .enter().append('line')
      .style('stroke', 'black')
      .style('stroke-opacity', 0.1)
      .attr('stroke-width', (d) => Math.sqrt(d.value));

    const node = d3.select('#flow-network').append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(_.shuffle(network.nodes))
      .enter().append('circle')
      .attr('r', 4)
      .style('fill', (d) => {
        const c = Math.min(category[d.id], 3);
        return Colors[c];
      });

    node.append('title')
      .text((d) => d.name);

    const ticked = () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y);
    }

    simulation
      .nodes(network.nodes)
      .on('tick', ticked);

    simulation
      .force('link')
      .links(network.links);

  }

  // componentWillUpdate(nextProps) {
  // }

  render () {
    return (
      <svg
        width={this.dim.w}
        height={this.dim.h}
      >
        <g id='flow-network' />
      </svg>
    );
  }
}

export default Network