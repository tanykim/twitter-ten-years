import React, { Component } from 'react'
import _ from 'lodash'
import Bars from './Bars'
import TweetsStates from '../../containers/TweetsStates'
// import { getMoment } from '../../processors/formatter'


class TimelineWrapper extends Component {
  // componentWillMount() {
    // const selectedRange = this.props.selectedRange;
    // this.selectedTweets = _.filter(this.props.tweets, function(t) {
    //   return selectedRange[0].diff(getMoment(t[0])) < 0 &&
    //     selectedRange[1].diff(getMoment(t[0])) > 0;
    //   });
  // }

  render () {
    console.log(this.props);
    return (
      <div className="row">
        <div className="col-xs-12">
          <Bars data={this.props.byMonth} range={this.props.range} />
        </div>
        <div className="col-xs-12">
            <TweetsStates />
        </div>
      </div>
    )
  }
}


export default TimelineWrapper
