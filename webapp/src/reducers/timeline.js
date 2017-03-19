//props triggered by user interaction

// import moment from 'moment'

// export const selectedRange = (state = [moment('2016-01', 'YYYY-MM'), moment('2016-02', 'YYYY-MM')], action) => {
//   if (action.type === 'SET_TIMELINE_RANGE') {
//     return action.range
//   } else {
//     return state
//   }
// }

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

