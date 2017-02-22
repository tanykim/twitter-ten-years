import moment from 'moment'
import Profile from './../data/profile.json'

let generated = false;

const timeRange = (state = [], action) => {
  if (action.type === 'SET_TIME_RANGE' && !generated) {
    const start = moment(Profile['signed_up_at'], 'YYYY-MM-DD HH:mm:ss');
    const end = start.clone().add(10, 'years');
    console.log(start, end);
    generated = true;
    return [start, end];
  } else {
    return state;
  }
}

export default timeRange;