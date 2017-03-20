import React, { Component } from 'react'

class TweetsWrapper extends Component {

  componentWillMount () {
    console.log('-------timeline wrapper will mount');
    this.props.getTweets();
  }

  render () {
    const { isFetchingTweets, tweets } = this.props

    return (
      <div>
        {isFetchingTweets && <div>Loading</div>}
        {tweets && <div>{
          //info of tweets in the selected range come here
          this.props.tweets.total
        }</div>}
      </div>
    )
  }
}

export default TweetsWrapper