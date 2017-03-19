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
        {tweets && <div>{this.props.tweets.data}</div>}
      </div>
    )
  }
}

export default TweetsWrapper