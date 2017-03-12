import { connect } from 'react-redux'
import { selectFriend } from '../actions'
import FlowWrapper from '../components/Flow/wrapper'

const mapStateToProps = (state) => {
  console.log(state)
  const data = state.dataByPage.flow.data
  return {
  range: state.timeRange,
  // data: state.dataByPage.flow
  friends: data.friends,
  lines: data.mentions,
  max: data.max,
  histogram: data.histogram,
  selectedFriend: state.selectedFriend,
  ranking: data.ranking
}}

const mapDispatchToProps =  ({
  selectFriend: selectFriend
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlowWrapper)