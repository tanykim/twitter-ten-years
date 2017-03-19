import _ from 'lodash'
import { getTimelineData, getFlowData, getFriendObj } from '../helpers/data'

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
// export const selectRange = (id) => ({
//   type: 'SET_TIMELINE_RANGE',
//   id
// })

export const getTweets = () => {
  return (dispatch) => {
    dispatch({ type: 'SET_FETCHING_TIMELINE_TWEETS', value: true })
     _.delay(() => {
      dispatch({ type: 'SET_TIMELINE_TWEETS', data: {data: 'aaa'} })
      dispatch({ type: 'SET_FETCHING_TIMELINE_TWEETS', value: false })
    }, 1000)
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
