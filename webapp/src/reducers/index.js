import { combineReducers } from 'redux'
import timeRange from './timeRange'
// import { friends, highlightedFriend } from './friends'
import friends from './friends'

export default combineReducers({
  timeRange,
  friends
  // highlightedFriend
})