import { connect } from 'react-redux';
import { selectFriend } from '../actions'
import FlowWrapper from '../components/Flow/wrapper'

const mapStateToProps = (state) => ({
  range: state.timeRange,
  friends: state.flow.friends,
  lines: state.flow.mentions,
  max: state.flow.max,
  histogram: state.flow.histogram,
  selectedFriend: state.selectedFriend,
  ranking: state.flow.ranking
});

const mapDispatchToProps =  ({
  selectFriend: selectFriend
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlowWrapper)