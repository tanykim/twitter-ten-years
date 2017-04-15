/* shared functions to calculate props/states */
import moment from 'moment'

export const getMoment = (d) => {
  return moment(d.substr(0, 19), 'YYYY-MM-DD HH:mm:ss')
}

export const getNumberedTime = (d) => {
  const h = +d.substr(11, 2)
  const m = +d.substr(14, 2)
  const s = +d.substr(17, 2)
  return h + m / 60 + s / (60 * 60)
}

export const getTimeDiff = (timeStrArray, unit) => {
  const latest = getMoment(timeStrArray[0])
  const oldest = getMoment(timeStrArray[timeStrArray.length - 1])
  return latest.diff(oldest, unit)
}

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const getWeekday = (id) => {
  return weekdays[id];
}

export const getAmPm = (h) => {
  if (h === 0 || h === 24) {
    return 'midnight';
  } else if (h === 12) {
    return 'noon';
  } else {
    return `${h % 12} ${h % 6 === 0 ? (h < 12 ? 'AM' : 'PM') : ''}`;
  }
}

export const getRangeText = (range) => {
  const sm = moment(range[0], 'YYYY-MM-DD');
  const em = moment(range[1], 'YYYY-MM-DD');
  const diff = em.diff(sm, 'days');

  return `from <strong>${sm.format('ddd MMM DD YYYY')}</strong> to <strong>${em.format('ddd MMM DD YYYY')}</strong> (<strong>${diff} days</strong>)`;
}

export const getSinceText = (duration) => {
  let number = duration;
  let unit = 'day';
  if (duration > 31 && duration < 365) {
    number = Math.ceil(duration / 12);
    unit = 'month';
  } else {
    number = Math.ceil(duration / 365);
    unit = 'year';
  }
  if (number === 0) {
    return 'only once';
  } else {
    return `for <strong>${number} ${unit}${number > 1 ? 's' : ''}</strong>`;
  }
}

//MUST be the same order as python code
const TypeList = {
  interaction: ['Mention', 'Quote', 'Retweet', 'No Interaction'],
  media: ['Photo', 'Video', 'URL', 'No Media'],
  language: ['Korean', 'English', 'Others'],
  source: ['Big Screen', 'Small Screen', 'Others']
}
export { TypeList }

//MUST be the same order as python code
const FriendTypes = [
  'Met in person first',
  'Never met in person',
  'Met on Twitter then met in person',
  'Celebrities or non-human'
]
export { FriendTypes }