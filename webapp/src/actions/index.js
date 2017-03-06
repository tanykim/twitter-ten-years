import _ from 'underscore'

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
    //TODO: async function for data loading
    // Promise.resolve(getDataByPage(page))
    //   .then(
    //     v => {
    //       console.log('---------data by page', v)
    //       dispatch(receiveData(page, v))
    //     }
    //   );
    setTimeout(function(){
       dispatch(receiveData(page, {aaa: 'aaa'}));
    }, 3000);
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

export const selectFriend = (id) => ({
  type: 'SET_FLOW_FRIEND_ID',
  id
})
