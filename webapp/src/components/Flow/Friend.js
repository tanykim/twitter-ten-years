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
    const common = friend.commonFriends.names.length;
    const since = getSinceText(friend.duration);
    return (<div className="summary-wrapper">
      <div className={`name name-${friend.category}`}>@{friend.name}</div>
      <div className="ranking-wrapper">
        <div className="friend-summary">
          <div className="ranking-title"><strong>{friend.count}</strong> mention{friend.count > 1 ? 's' : ''}</div>
          <div className="ranking-wrapper">
            <div className="percentage"> Top {Math.ceil(ranking.count / ranking.total * 1000) / 10} %</div>
            <div className="ranking"><div>{ranking.count}</div><div>{ranking.total}</div></div>
            <RankBar type="count" data={ranking} />
          </div>
        </div>
        <div className="friend-summary">
          <div className="ranking-title"><span dangerouslySetInnerHTML={{__html: since}} /> {friend.count > 1 && `since ${friend.first}`}</div>
          <div className="ranking-wrapper">
            <div className="percentage"> Top {Math.ceil(ranking.duration / ranking.total * 1000) / 10} %</div>
            <div className="ranking"><div>{ranking.duration}</div><div>{ranking.total}</div></div>
            <RankBar type="duration" data={ranking} />
          </div>
        </div>
        <div className="friend-summary">
          { common > 0 ?
            <span><strong>{Math.ceil(friend.commonFriends.totalCount / friend.count * 1000) / 10}% </strong>
            of mentions to this friend involves <br/>
            other <strong>{common}</strong> friend{common > 1 ? 's' : ''} in total.</span> :
            <span>No other friends are involved in the mentions to this friend</span> }
        </div>
      </div>
    </div>);
  }
}


export default Friend


          // <thead>
          //   <tr>
          //     <th>Mentions</th><th>Since</th><th>Common Friends</th>
          //   </tr>
          // </thead>
          // <tbody>
          //   <tr>
          //     <td>{friend.count}</td><td>{friend.first}</td><td>{friend.commonFriends.length}</td>
          //   </tr>
          //   <tr>
          //     <td>
          //       <div className="ranking"><div>{ranking.count}</div><div>{ranking.total}</div></div>
          //       <RankBar type="count" data={ranking} />
          //     </td>
          //     <td>
          //       <div className="ranking"><div>{ranking.duration}</div><div>{ranking.total}</div></div>
          //       <RankBar type="duration" data={ranking} />
          //     </td>
          //     <td>
          //       <div className="ranking"><div>{ranking.common}</div><div>{ranking.total}</div></div>
          //       <RankBar type="common" data={ranking} />
          //     </td>
          //   </tr>
          // </tbody>
