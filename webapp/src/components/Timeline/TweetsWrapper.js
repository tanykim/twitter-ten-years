import React, { Component } from 'react'
import _ from 'lodash'
import Matrix from './Matrix'
import Pie from './Pie'
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
          !isFetchingTweets && !_.isEmpty(tweets) && <div>
          <div> {tweets.total} Tweets {getRangeText(selectedRange)}</div>
          <div className="row">
            {
              tweets.byType.map((value, i) =>
                <div className="col-lg-3" key={i}>
                  <Pie label={value[0]} data={value[1]} total={tweets.total} />
                </div>
              )
            }
          </div>
          <Matrix data={tweets.byDayHour} max={tweets.max}/>
        </div>}
      </div>
    )
  }
}

export default TweetsWrapper