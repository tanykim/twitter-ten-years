import _ from 'lodash'
import { getFlowData } from '../processors/generator'
import { getTimelineData } from '../processors/generator'

//TODO: figure out what this really does
export const invalidatePage = (page) => ({
  type: 'INVALIDATE_PAGE',
  page
})

export const requestData = (page) => ({
  type: 'REQUEST_DATA',
  page
})

export const receiveData = (page, data) => ({
  type: 'RECEIVE_DATA',
  page,
  data
})

function fetchData(page) {
  return dispatch => {
    dispatch(requestData(page))

    //use defer to keep 'loading' while processing data
    _.defer(() => {
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
      dispatch(receiveData(page, data))
    })
  }
}

function shouldFetchData(state, page) {
  const data = state.dataByPage[page]
  if (!data) {
    return true
  } else if (data.isFetching) {
    return false
  } else {
    return data.didInvalidate
  }
}

export function fetchDataIfNeeded(page) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState(), page)) {
      return dispatch(fetchData(page))
    } else {
      return Promise.resolve()
    }
  }
}

// export const finishPageRender = (page) => ({
//   type: 'FINISH_PAGE_RENDER',
//   page
// })

// export function pageRenderFinished(page) {
//   dispatch(finishPageRender(page))
// }

/* Timeline */
export const selectRange = (id) => ({
  type: 'SET_TIMELINE_RANGE',
  id
})

/* Flow */
export const selectFriend = (id) => ({
  type: 'SET_FLOW_FRIEND',
  id
})
