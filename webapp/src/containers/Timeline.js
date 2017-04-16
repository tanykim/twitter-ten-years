import { connect } from 'react-redux'
import {
  fetchDataIfNeeded,
  selectRange,
  getTweets,
  changeTimelineCategory,
  changeTimelineMatrixView } from '../actions'
import TimelineWrapper from '../components/Timeline/wrapper'

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.isFetching,
    range: state.timeRange,
    data: state.dataByPage.timeline,
    category: state.category,
    matrix: state.matrix,
    selectedRange: state.selectedRange,
    isFetchingTweets: state.isFetchingTweets,
    tweets: state.tweets,
    isHidden: state.isHidden
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    onMountFunc: () => {
      dispatch(fetchDataIfNeeded('timeline'));
      dispatch(selectRange());
    },
    getTweets: (range) => dispatch(getTweets(range)),
    changeCategory: (category) => dispatch(changeTimelineCategory(category)),
    changeMatrixView: (view) => dispatch(changeTimelineMatrixView(view))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(TimelineWrapper)