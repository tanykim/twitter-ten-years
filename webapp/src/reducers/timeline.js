//props triggered by user interaction

export const selectedRange = (state = [], action) => {
  if (action.type === 'SET_TIMELINE_RANGE') {
    return action.range
  } else {
    return state
  }
}

export const isFetchingTweets = (state = false, action) => {
  if (action.type === 'SET_FETCHING_TIMELINE_TWEETS') {
    return action.value
  } else {
    return state
  }
}

export const tweets = (state = {}, action) => {
  if (action.type === 'SET_TIMELINE_TWEETS') {
    return action.data
  } else {
    return state
  }
}

export const view = (state = 'all', action) => {
  if (action.type === 'SET_TIMELINE_VIEW') {
    return action.data
  } else {
    return state
  }
}

export const category = (state = 'interaction', action) => {
  if (action.type === 'SET_TIMELINE_CATEGORY') {
    return action.data
  } else {
    return state
  }
}
