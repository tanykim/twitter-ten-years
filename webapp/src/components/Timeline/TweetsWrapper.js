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
    const { isFetchingTweets, tweets, selectedRange, view, category, matrix } = this.props
    return (
      <div>
        { isFetchingTweets && <div>Loading</div>}
        { //info of tweets in the selected range come here
          !isFetchingTweets && !_.isEmpty(tweets) && <div>
          <div> {tweets.total} Tweets {getRangeText(selectedRange)}</div>
          { view === 'category' && <div className="row">
            {
              tweets.byType.map((value, i) =>
                <div className={`col-lg-3 ${category === value[0] ? 'category-selected' : ''}`} key={i}>
                  <Pie label={value[0]} data={value[1]} total={tweets.total} category={category} />
                </div>
              )
            }
          </div> }
          <Matrix
            {...tweets}
            view={view} category={category}
            matrix={matrix}
            changeMatrixView={this.props.changeMatrixView}
            />
        </div>}
      </div>
    )
  }
}

export default TweetsWrapper