import { connect } from 'react-redux';
// import { highlightFlowLine } from '../actions'
import Lines from '../components/Flow/Lines'

const mapStateToProps = (state) => ({
  lines: state.friends.mentions,
  range: state.timeRange,
  max: state.friends.max
  // highlighted: state.highightedFriend
});

// const mapDispatchToProps =  ({
//   onLineMouseOver: highlightFlowLine
// })

const VisibleFlowLines = connect(
  mapStateToProps,
  // mapDispatchToProps
)(Lines)

export default VisibleFlowLines
