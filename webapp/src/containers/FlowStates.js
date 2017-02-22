import { connect } from 'react-redux';
import { selectFriend } from '../actions'
// import Lines from '../components/Flow/Lines'
import FlowWrapper from '../components/Flow/wrapper'

const mapStateToProps = (state) => ({
  friends: state.flow.friends,
  lines: state.flow.mentions,
  range: state.timeRange,
  max: state.flow.max,
  selectedFriend: state.selectedFriend
  // highlighted: state.highightedFriend
});

const mapDispatchToProps =  ({
  selectFriend: selectFriend
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlowWrapper)

// export default VisibleFlowLines
