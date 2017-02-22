import React, { Component } from 'react'
import FlowStates from '../containers/FlowStates'
// import Graph from './Flow/Graph'

class Flow extends Component {
  render () {
    return (
      <div className="row">
        <div className="col-xs-12">
          Talking to Friends
          <FlowStates />
        </div>
      </div>
    );
  }
}

export default Flow
