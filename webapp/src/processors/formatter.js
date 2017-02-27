/* shared functions to calculate props/states */

import moment from 'moment'

const formatTime = (d, f) => {
  return d.format(f);
}

const getMoment = (d) => {
  return moment(d.substr(0, 19), 'YYYY-MM-DD HH:mm:ss');

}
const formatToYearMonth = (d) => {
  return getMoment(d).format('YYYY-MM');
}

const getTimeDiff = (timeStrArray, unit) => {
  const latest = getMoment(timeStrArray[0]);
  const oldest = getMoment(timeStrArray[timeStrArray.length - 1]);
  return latest.diff(oldest, unit);
}

export { formatTime, formatToYearMonth, getTimeDiff }