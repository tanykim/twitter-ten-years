import React, { Component } from 'react'

class Friend extends Component {
  render () {
    const friend = this.props.friend;
    return (
      <div className="friend-stats">
        {friend &&
          `@${friend.name} - sent ${friend.count} mentions for ${friend.duration} days
          ranking in count: ${friend.ranking.count} / ${this.props.lines.length}
          ranking in duration: ${friend.ranking.duration} / ${this.props.lines.length}`
        }
      </div>
    );
  }
}

export default Friend