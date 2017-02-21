import React, { Component } from 'react';
import Graph from './Flow/Graph';

console.log('--------flow.js');

class Flow extends Component {
  render () {
    return (
      <div className="row">
        <div className="col-xs-12">
          Talking to Friends
          <Graph />
        </div>
      </div>
    );
  }
}

export default Flow;
