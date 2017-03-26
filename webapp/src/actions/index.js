import _ from 'lodash'
import { getTimelineData, getTweetsData, getFlowData, getFriendObj } from '../helpers/data'

export const fetchDataIfNeeded = (page) => {
  return (dispatch, getState) => {
    //if data is not defined, get data
    if (!getState().dataByPage[page]) {
      dispatch({ type: 'REQUEST_DATA' })
      _.delay(() => {
        let data;
        switch (page) {
          case 'timeline':
            data = getTimelineData()
            break
          case 'flow':
            data = getFlowData()
            break
          default:
            data = {aaa: 'aaaa'}
        }
        dispatch({ type: 'RECEIVE_DATA', page, data })
      }, 100)
    }
    /* By default state.isFetching is false,
    that is, if data exists, no Request and Receive happens,
    Instead page is loaded immediately */
  }
}

/* Timeline */

export const selectRange = (range) => ({
  type: 'SET_TIMELINE_RANGE',
  range
})

export const getTweets = (range) => {
  return (dispatch) => {
    dispatch({ type: 'SET_TIMELINE_RANGE', range })
    dispatch({ type: 'SET_FETCHING_TIMELINE_TWEETS', value: true })
     _.delay(() => {
      dispatch({ type: 'SET_TIMELINE_TWEETS', data: getTweetsData(range)})
      dispatch({ type: 'SET_FETCHING_TIMELINE_TWEETS', value: false })
    }, 1000)
  }
}

export const changeTimelineView = (data) => {
  return (dispatch) => {
    dispatch({ type: 'SET_TIMELINE_VIEW', data })
  }
}

export const changeTimelineCategory = (data) => {
  return (dispatch) => {
    dispatch({ type: 'SET_TIMELINE_CATEGORY', data })
  }
}

export const changeTimelineMatrixView = (data) => {
  return (dispatch) => {
    dispatch({ type: 'SET_TIMELINE_MATRIX_VIEW', data })
  }
}

/* Flow */
export const selectFriend = (id) => {
  return (dispatch, getState) => {
    const { mentions, ranking } = getState().dataByPage.flow;
    const data = getFriendObj(mentions, ranking, id)
    dispatch({ type: 'SET_FLOW_FRIEND', data })
  }
}
