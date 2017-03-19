import { connect } from 'react-redux'
import { fetchDataIfNeeded, getTweets } from '../actions'
import TimelineWrapper from '../components/Timeline/wrapper'

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching,
    range: state.timeRange,
    data: state.dataByPage.timeline,
    selectedRange: state.selectedRange,
    tweets: state.tweets,
    isFetchingTweets: state.isFetchingTweets
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    onMountFunc: () => dispatch(fetchDataIfNeeded('timeline')),
    getTweets: () => dispatch(getTweets())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(TimelineWrapper)