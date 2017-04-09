import React, { Component } from 'react'
import _ from 'lodash'
import { getSinceText } from '../../helpers/formatter'

const RankBar = (props) => {
  const ratio = Math.floor(props.data[props.type] / props.data.total * 10);
  return (<div className="ranking-graph">
    {_.range(10).map((i) => <div className={`line${i >= ratio ? '-filled' : ''}`} key={i}></div>)}
  </div>)
}

class Friend extends Component {
  render () {
    const friend = this.props.friend;
    const ranking = friend.ranking;
    const common = friend.common;
    const since = getSinceText(friend.duration);
    return (<div className="friend-wrapper">
      <div className={`name name-${friend.category}`}>@{friend.name}</div>
      <div className="summary-wrapper">
        <div className="friend-summary">
          <strong>{friend.count}</strong> mention{friend.count > 1 ? 's' : ''}
        </div>
        <div className="friend-summary">
          <span dangerouslySetInnerHTML={{__html: since}} /> {friend.count > 1 && `since ${friend.first}`}
        </div>
        <div className="friend-summary">
          Involved with conversations with other <strong>{friend.common}</strong>
          {` `}friend{common > 1 ? 's' : ''}
        </div>
      </div>
    </div>);
  }
}

export default Friend