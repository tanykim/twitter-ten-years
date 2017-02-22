import { combineReducers } from 'redux'
import timeRange from './timeRange'
// import { friends, highlightedFriend } from './friends'
import { flow, selectedFriend } from './flow'

export default combineReducers({
  timeRange,
  flow,
  selectedFriend
  // highlightedFriend
})