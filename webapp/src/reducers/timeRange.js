import moment from 'moment'
import Profile from './../data/profile.json'

let timeRange = null;

export default () => {
  if (!timeRange) {
    const start = moment(Profile['signed_up_at'], 'YYYY-MM-DD HH:mm:ss');
    const end = start.clone().add(10, 'years');
    timeRange = [start, end];
  }
  return timeRange;
}