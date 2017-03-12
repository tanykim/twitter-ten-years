import { combineReducers } from 'redux'
import timeRange from './timeRange'
import { dataByPage, isFetching } from './page'

import { selectedFriend } from './flow'

export default combineReducers({
  // selectedPage,
  timeRange,
  dataByPage,
  isFetching,
  selectedFriend
})