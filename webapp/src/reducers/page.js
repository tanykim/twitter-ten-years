const data = (state = {didInvalidate: false}, action) => {
  switch (action.type) {
    case 'INVALIDATE_PAGE':
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case 'REQUEST_DATA':
      return Object.assign({}, state, {
        didInvalidate: false
      })
    case 'RECEIVE_DATA':
      return Object.assign({}, state, {
        didInvalidate: false,
        data: action.data,
      })
    default:
      return state
  }
}

export function dataByPage(state = {}, action) {
  switch (action.type) {
    case 'INVALIDATE_PAGE':
    case 'REQUEST_DATA':
    case 'RECEIVE_DATA':
      return Object.assign({}, state, {
        [action.page]: data(state[action.page], action)
      })
    default:
      return state
  }
}

export function isFetching(state = false, action) {
  switch (action.type) {
    case 'INVALIDATE_PAGE':
    case 'REQUEST_DATA':
      return true
    case 'RECEIVE_DATA':
      return false
    default:
      return state
  }
}

export function isPageRenderFinished(state={}, action) {
  switch (action.type) {
    case 'FINISH_PAGE_RENDER':
      return Object.assign({}, state, {
        [action.page]: true
      })
    default:
      return state
  }
}