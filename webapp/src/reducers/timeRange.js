import moment from 'moment';
import Profile from './../data/profile.json';

const timeRange = (date = Profile['signed_up_at']) => {
  const start = moment(date, 'YYYY-MM-DD HH:mm:ss');
  const end = start.clone().add(10, 'years');
  return [start, end];
};

export default timeRange;