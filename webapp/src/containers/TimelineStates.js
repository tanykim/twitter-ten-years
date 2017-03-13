import { connect } from 'react-redux'
import { selectRange } from '../actions'
import TimelineWrapper from '../components/Timeline/wrapper'

const mapStateToProps = (state) => {
  const data = state.dataByPage.timeline.data
  return {
    range: state.timeRange,
    selectedRange: state.selectedRange,
    tweets: data.tweets,
    byMonth: data.byMonth,
  }
}

const mapDispatchToProps =  ({
  selectRange: selectRange
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineWrapper)