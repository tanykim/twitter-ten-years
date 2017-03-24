import React, { Component } from 'react'
import _ from 'lodash'
import Matrix from './Matrix'
import { getRangeText } from '../../helpers/formatter'

class TweetsWrapper extends Component {

  componentWillMount () {
    console.log('-------timeline wrapper will mount');
    //get tweets data before mountain
    this.props.getTweets()
  }

  render () {
    const { isFetchingTweets, tweets, selectedRange } = this.props

    return (
      <div>
        { isFetchingTweets && <div>Loading</div>}
        { //info of tweets in the selected range come here
          !isFetchingTweets && !_.isEmpty(tweets) && <div className="matrix-wrapper">
          <div> {tweets.total} Tweets {getRangeText(selectedRange)}</div>
          <Matrix data={tweets.byDayHour} max={tweets.max}/>
        </div>}
      </div>
    )
  }
}

export default TweetsWrapper