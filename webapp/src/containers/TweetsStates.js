import { connect } from 'react-redux'
import { getTweets } from '../actions'

// import { fetchDataIfNeeded, invalidatePage } from '../actions'
import TweetsWrapper from '../components/Timeline/TweetsWrapper'

const mapStateToProps = (state) => (
  {
    isFetchingTweets: state.isFetchingTweets,
    tweets: state.tweets
  }
)

const mapDispatchToProps = (dispatch) => (
  {onMountFunc: () => dispatch(getTweets())}
)

export default connect(mapStateToProps, mapDispatchToProps)(TweetsWrapper)