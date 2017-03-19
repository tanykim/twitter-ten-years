import { connect } from 'react-redux'
import { selectFriend } from '../actions'
import FriendWrapper from '../components/Flow/FriendWrapper'

const mapStateToProps = (state) => {
  return {
    friend: state.selectedFriend
  }
}

const mapDispatchToProps = (dispatch) => (
  {selectFriend: (id) => dispatch(selectFriend(id))}
)

export default connect(mapStateToProps, mapDispatchToProps)(FriendWrapper)