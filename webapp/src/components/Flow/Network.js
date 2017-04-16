import React, { Component } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'

class Network extends Component {

  componentWillMount () {
    const containerW = document.getElementById('graph-half').clientWidth - 60;
    this.dim = {
      w: containerW,
      h: containerW
    };
    this.involvedFriends = null;
  }

  componentDidMount() {

    let self = this;

    const { network, category, friend } = this.props;

    //involved friends later used for toggle
    this.involvedFriends = network.involvedFriends;

    //elaborate setting should be needed depending on the shape of network
    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d) => d.id).distance(17))
      .force('collide', d3.forceCollide(4))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.dim.w / 2, this.dim.w / 2))
      .force('x', d3.forceX().strength(0.065))
      .force('y', d3.forceY().strength(0.065))

    const link = d3.select('#flow-network').append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(network.links)
      .enter()
      .append('line')
      .attr('class', (d) => `network-link js-link-${d.f1} js-link-${d.f2}`)
      .attr('stroke-width', (d) => Math.sqrt(d.value));

    const node = d3.select('#flow-network').append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(_.shuffle(network.nodes))
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('class', (d) => `dot elm-friend-${category[d.id]} js-node-${d.id}`)
      .on('mouseover', function(d) {
        d3.select(this).classed('hovered', true);
        d3.select('#network-horver')
          .html(`<strong>@${d.name}</strong> has been mentioned in converations with other <strong>${d.linked.length}</strong> friend${d.linked.length > 1 ? 's' : ''}`);
      })
      .on('click', function(d) {
        self.props.selectFriend(d.id);
      })
      .on('mouseout', function(d) {
        d3.select(this).classed('hovered', false);
        d3.select('#network-horver').html('');
      });

    node.append('title').text((d) => `@${d.name}`);

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
      .on('tick', ticked)
      .force('link')
      .links(network.links);

    //if friend is already selected (i.e., page change)
    if (friend.id) {
      this.highlightFriend(friend.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.friend.id !== nextProps.friend.id) {
      //turn off old ones
      const oldFriend = this.props.friend.id;
      d3.select(`.js-node-${oldFriend}`).classed('selected', false).attr('r', 4);
      d3.selectAll(`.js-link-${oldFriend}`).classed('linked', false);
      const oldLinked = this.involvedFriends[oldFriend];
      if (oldLinked) {
        oldLinked.map((l) => d3.select(`.js-node-${l[0]}`).classed('linked-node', false));
      }

      //highlight new node and links
      const newFriend = nextProps.friend.id;
      this.highlightFriend(newFriend);
    }
  }

  highlightFriend(id) {
    d3.select(`.js-node-${id}`).classed('selected', true).attr('r', 8);
    d3.selectAll(`.js-link-${id}`).classed('linked', true);
    const newLinked = this.involvedFriends[id];
    if (newLinked) {
      newLinked.map((l) => d3.select(`.js-node-${l[0]}`).classed('linked-node', true));
    }
  }

  render () {
    return (
      <div className="vis-bg network-wrapper">
        <div className="option">
          <div className="title"><span className="number">Option 3</span> Select a node in the conversation network</div>
          <div className="desc" id="network-horver"></div>
        </div>
        <svg
          width={this.dim.w}
          height={this.dim.h}
        >
          <g id='flow-network' />
        </svg>
      </div>
    );
  }
}

export default Network