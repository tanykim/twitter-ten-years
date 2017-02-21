import { connect } from 'react-redux';
import Lines from '../components/Flow/Lines'

console.log('-------container visibleflowlines');

const mapStateToProps = (state) => ({
  lines: state.friends.mentions,
  range: state.timeRange,
  max: state.friends.max
});

const VisibleFlowLines = connect(
  mapStateToProps
)(Lines)

export default VisibleFlowLines
