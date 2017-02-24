import React, { Component } from 'react'
import SelectFriend from './SelectFriend'
import Stats from './Stats'
import Graph from './Graph'
import Friend from './Friend'
import { getFriendObj } from '../../processors/filter'

class FlowWrapper extends Component {

  componentWillUpdate(nextProps) {
    if (nextProps.selectedFriend > 0) {
      this.friend = getFriendObj(nextProps.lines, nextProps.selectedFriend);
    }
  }

  render () {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <SelectFriend friends={this.props.friends} />
        </div>
        <div className="col-xs-12">
          <Graph {...this.props} friend={this.friend} />
          <Stats {...this.props} />
        </div>
        <div className="col-xs-12">
          <Friend {...this.props} friend={this.friend} />
        </div>
      </div>
    );
  }
}

export default FlowWrapper