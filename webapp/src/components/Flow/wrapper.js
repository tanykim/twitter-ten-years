import React, { Component } from 'react'
import FriendStates from '../../containers/FriendStates'

class FlowWrapper extends Component {
  render () {
    return (
      <FriendStates {...this.props} />
    )
  }
}

export default FlowWrapper