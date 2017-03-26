import { connect } from 'react-redux'
import {
  fetchDataIfNeeded,
  selectRange,
  getTweets,
  changeTimelineView,
  changeTimelineCategory,
  changeTimelineMatrixView } from '../actions'
import TimelineWrapper from '../components/Timeline/wrapper'

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching,
    range: state.timeRange,
    data: state.dataByPage.timeline,
    view: state.view,
    category: state.category,
    matrix: state.matrix,
    selectedRange: state.selectedRange,
    isFetchingTweets: state.isFetchingTweets,
    tweets: state.tweets,
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    onMountFunc: () => {
      dispatch(fetchDataIfNeeded('timeline'));
      dispatch(selectRange());
    },
    //selectRange: () => dispatch(selectRange()),
    getTweets: (range) => dispatch(getTweets(range)),
    changeView: (view) => dispatch(changeTimelineView(view)),
    changeCategory: (category) => dispatch(changeTimelineCategory(category)),
    changeMatrixView: (view) => dispatch(changeTimelineMatrixView(view))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(TimelineWrapper)