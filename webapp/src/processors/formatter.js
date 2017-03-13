/* shared functions to calculate props/states */

import moment from 'moment'

const formatTime = (d, f) => {
  return d.format(f)
}

const getMoment = (d) => {
  return moment(d.substr(0, 19), 'YYYY-MM-DD HH:mm:ss')
}

const getNumberedTime = (d) => {
  const h = +d.substr(11, 2)
  const m = +d.substr(14, 2)
  const s = +d.substr(17, 2)
  // console.log(d, h, m, s, h + m / 60 + s / (60 * 60));
  return h + m / 60 + s / (60 * 60)
}

const formatToYearMonth = (d) => {
  return getMoment(d).format('YYYY-MM')
}

const getTimeDiff = (timeStrArray, unit) => {
  const latest = getMoment(timeStrArray[0])
  const oldest = getMoment(timeStrArray[timeStrArray.length - 1])
  return latest.diff(oldest, unit)
}

export { formatTime, formatToYearMonth, getTimeDiff, getMoment, getNumberedTime }