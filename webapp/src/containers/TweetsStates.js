import { connect } from 'react-redux'
import { getTweets } from '../actions'

// import { fetchDataIfNeeded, invalidatePage } from '../actions'
import TweetsWrapper from '../components/Timeline/TweetsWrapper'

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    // range: state.timeRange,
    // selectedRange: state.selectedRange,
    isFetchingTweets: state.isFetchingTweets,
    tweets: state.tweets
    // tweets: data.tweets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {_onMountFunc: () => dispatch(getTweets())}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TweetsWrapper)