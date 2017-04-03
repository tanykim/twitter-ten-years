import React, { Component } from 'react'

class Friend extends Component {
  render () {
    const friend = this.props.friend;
    return (
      <div className="vis-bg friend-wrapper">
        <div className={`name-${friend.category}`}>@{friend.name}</div>
        <table>
          <thead>
            <tr>
              <th>Mentions</th><th>Since</th><th>Common Friends</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{friend.count}</td><td>{friend.first}</td><td>{friend.commonFriends.length}</td>
            </tr>
            <tr>
              <td>{friend.ranking.count} / {friend.ranking.total}</td>
              <td>{friend.ranking.duration} / {friend.ranking.total}</td>
              <td>{friend.ranking.common} / {friend.ranking.totalWithCommon}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Friend