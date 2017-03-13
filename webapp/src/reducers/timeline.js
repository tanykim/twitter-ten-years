//props triggered by user interaction
import moment from 'moment'

const selectedRange = (state = [moment('2016-01', 'YYYY-MM'), moment('2016-02', 'YYYY-MM')], action) => {
  if (action.type === 'SET_TIMELINE_RANGE') {
    return action.range;
  } else {
    return state;
  }
}

export { selectedRange }