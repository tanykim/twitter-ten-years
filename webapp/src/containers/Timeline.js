import { connect } from 'react-redux'
import { fetchDataIfNeeded, getTweets, changeTimelineView, changeTimelineCategory, changeTimelineMatrixView } from '../actions'
import TimelineWrapper from '../components/Timeline/wrapper'

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching,
    range: state.timeRange,
    data: state.dataByPage.timeline,
    selectedRange: state.selectedRange,
    tweets: state.tweets,
    isFetchingTweets: state.isFetchingTweets,
    view: state.view,
    category: state.category,
    matrix: state.matrix,
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    onMountFunc: () => dispatch(fetchDataIfNeeded('timeline')),
    getTweets: () => dispatch(getTweets()),
    changeView: (view) => dispatch(changeTimelineView(view)),
    changeCategory: (category) => dispatch(changeTimelineCategory(category)),
    changeMatrixView: (view) => dispatch(changeTimelineMatrixView(view))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(TimelineWrapper)