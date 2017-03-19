import React, { Component } from 'react'
import _ from 'lodash'
import SelectFriend from './SelectFriend'
import Graph from './Graph'
import Stats from './Stats'
import Friend from './Friend'
import Histogram from './Histogram'

class FriendWrapper extends Component {
  render () {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <SelectFriend {...this.props} />
        </div>
        <div className="col-xs-12">
          <Graph {...this.props} />
          <Stats {...this.props} />
        </div>
        <div className="col-xs-12">
          {!_.isEmpty(this.props.friend) && <Friend {...this.props} /> }
        </div>
        <div className="col-xs-12 col-lg-6">
          <div> Number of sent mentions </div>
          <Histogram {...this.props} type="count" />
        </div>
        <div className="col-xs-12 col-lg-6">
          <div> Duration of communication (Days) </div>
          <Histogram {...this.props} type="duration" />
        </div>
      </div>
    )
  }
}

export default FriendWrapper