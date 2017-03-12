import React, { Component } from 'react'
import SelectFriend from './SelectFriend'
import Stats from './Stats'
import Graph from './Graph'
import Friend from './Friend'
import Histogram from './Histogram'
import { getFriendObj } from '../../processors/calculator'

class FlowWrapper extends Component {

  // constructor(props) {
  //   super();
  // }

  componentWillUpdate(nextProps) {
    if (nextProps.selectedFriend > 0) {
      this.friend = getFriendObj(this.props.lines, this.props.ranking, nextProps.selectedFriend);
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
        <div className="col-xs-12 col-lg-6">
          <div> Number of sent mentions </div>
          <Histogram {...this.props} type="count" friend={this.friend} />
        </div>
        <div className="col-xs-12 col-lg-6">
          <div> Duration of communication (Days) </div>
          <Histogram {...this.props} type="duration" friend={this.friend} />
        </div>
      </div>
    )
  }
}

export default FlowWrapper