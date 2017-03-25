import { combineReducers } from 'redux'
import moment from 'moment'
import Profile from './../data/profile.json'
import { selectedRange, isFetchingTweets, tweets, view, category } from './timeline'
import { selectedFriend } from './flow'

const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'REQUEST_DATA':
      return true
    case 'RECEIVE_DATA':
      return false
    default:
      return state
  }
}

let isTimeRangeSet = false;
const timeRange = () => {
  if (!isTimeRangeSet) {
    const start = moment(Profile['signed_up_at'], 'YYYY-MM-DD HH:mm:ss');
    const end = start.clone().add(10, 'years');
    return [start, end];
  }
}

const dataByPage = (state = {}, action) => {
  if (action.type === 'RECEIVE_DATA') {
    return Object.assign({}, state, {[action.page]: action.data})
  } else {
    return state
  }
}

export default combineReducers({
  isFetching,
  timeRange,
  dataByPage,
  selectedRange, isFetchingTweets, tweets, view, category,
  selectedFriend
})