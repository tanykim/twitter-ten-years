import { combineReducers } from 'redux'
import timeRange from './timeRange'
import { dataByPage, isFetching } from './page'
import { selectedRange } from './timeline'
import { selectedFriend } from './flow'

export default combineReducers({
  timeRange,
  dataByPage,
  isFetching,
  // isPageRenderFinished,
  selectedRange,
  selectedFriend
})