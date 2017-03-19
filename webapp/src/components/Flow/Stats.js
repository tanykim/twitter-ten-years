import React, { Component } from 'react'
import _ from 'lodash'

class Stats extends Component {
  render () {
    return (
      <div className="flow-stats">
        <div> Selected: {!_.isEmpty(this.props.friend) && `@${this.props.friend.name}`}</div>
        <div> Sent mentions to <b>{this.props.mentions.length}</b> twitter accounts </div>
        <div id="flow-stats" className="hover-summary"></div>
      </div>
    );
  }
}

export default Stats