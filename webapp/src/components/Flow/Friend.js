import React, { Component } from 'react'
import _ from 'underscore'

class Friend extends Component {
  render () {
    const friend = this.props.friend;
    return (
      <div className="friend-stats">
        {!_.isUndefined(friend) && `@${friend.name} - sent ${friend.count} mentions`}
      </div>
    );
  }
}

export default Friend