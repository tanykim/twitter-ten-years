import { connect } from 'react-redux'
import TimelineWrapper from '../components/Timeline/wrapper'

const mapStateToProps = (state) => {
  const data = state.dataByPage.flow.data
  return {
    range: state.timeRange,
  }
}

// const mapDispatchToProps =  ({
//   selectFriend: selectFriend
// })

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(TimelineWrapper)