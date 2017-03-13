import React, { Component } from 'react'
import _ from 'lodash'
// import moment from 'moment'
// import SelectFriend from './SelectFriend'
import Bars from './Bars'
import Tweets from './Tweets'
// import Graph from './Graph'
// import Friend from './Friend'
// import Histogram from './Histogram'
import { getMoment } from '../../processors/formatter'
// import { finishPageRender } from '../../actions'

// import { connect } from 'react-redux'


class TimelineWrapper extends Component {

  // constructor(props) {
  //   super();
  // }

  // componentWillUpdate(nextProps) {
  //   if (nextProps.selectedFriend > 0) {
  //     this.friend = getFriendObj(this.props.lines, this.props.ranking, nextProps.selectedFriend);
  //   }
  // }

  componentWillMount() {
    const selectedRange = this.props.selectedRange;
    this.selectedTweets = _.filter(this.props.tweets, function(t) {
      return selectedRange[0].diff(getMoment(t[0])) < 0 &&
        selectedRange[1].diff(getMoment(t[0])) > 0;
      });
    // this.selectedRange = selectedRange;
    // console.log(this.selectedTweets);
  }

  componentDidMount() {
    console.log('--------- did mount');
    // this.props.dispatch(finishPageRender, 'timeline')
  }

  render () {
    // console.log(this.props)
    return (
      <div className="row">
        <div className="col-xs-3">
          <Bars data={this.props.byMonth} range={this.props.range} />
        </div>
        <div className="col-xs-6">
          <Tweets data={this.selectedTweets} range={this.props.selectedRange}/>
        </div>
      </div>
    )
  }
}
          //
export default TimelineWrapper


// function mapStateToProps(state) {
//   return {
//     data: state.dataByPage,
//     isFetching: state.isFetching,
//     isPageRenderFinished: state.isPageRenderFinished
//   }
// }

// export default connect()(TimelineWrapper)