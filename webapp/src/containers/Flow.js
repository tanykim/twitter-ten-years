import { connect } from 'react-redux'
import { fetchDataIfNeeded, selectFriend } from '../actions'
import FlowWrapper from '../components/Flow/wrapper'

const mapStateToProps = (state, ownProps) => (
  {
    isFetching: state.isFetching,
    range: state.timeRange,
    data: state.dataByPage.flow,
    selectedFriend: state.selectedFriend
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    onMountFunc: () => {
      dispatch({ type: 'SET_FLOW_FRIEND', data: {} });
      dispatch(fetchDataIfNeeded('flow'));
    },
    selectFriend: (id) => dispatch(selectFriend(id))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(FlowWrapper)