import React, { Component } from 'react'

class TweetsWrapper extends Component {

  componentWillMount () {
    console.log('-------timeline wrapper will mount');
    this.props._onMountFunc();

  //   const containerW = document.getElementById('graph-3qt').clientWidth - 30;
  //   this.margin = {top: 40, right: 10, bottom: 10, left: 40};
  //   const timeDomain = this.props.range;
  //   const dayDomain = [0, 24];
  //   this.dim = {
  //     w: containerW - this.margin.left - this.margin.right,
  //     h: 1000 - this.margin.top - this.margin.bottom
  //   };
  //   this.x = d3.scaleTime().domain(timeDomain).range([0, this.dim.w]);
  //   this.y = d3.scaleLinear().domain(dayDomain).range([0, this.dim.h]);
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