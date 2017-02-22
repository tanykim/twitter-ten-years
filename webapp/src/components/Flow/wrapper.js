import React, { Component } from 'react'
import SelectFriend from '../../containers/SelectFriend'
import Stats from './Stats'
import Graph from './Graph'

class FlowWrapper extends Component {
  render () {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <SelectFriend friends={this.props.friends} />
        </div>
        <div className="col-xs-12">
          <Graph {...this.props} />
          <Stats {...this.props} />
        </div>
      </div>
    );
  }
}

export default FlowWrapper