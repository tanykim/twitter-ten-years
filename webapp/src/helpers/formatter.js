/* shared functions to calculate props/states */

import moment from 'moment'

export const formatTime = (d, f) => {
  return d.format(f)
}

export const getMoment = (d) => {
  return moment(d.substr(0, 19), 'YYYY-MM-DD HH:mm:ss')
}

export const getNumberedTime = (d) => {
  const h = +d.substr(11, 2)
  const m = +d.substr(14, 2)
  const s = +d.substr(17, 2)
  return h + m / 60 + s / (60 * 60)
}

export const formatToYearMonth = (d) => {
  return getMoment(d).format('YYYY-MM')
}

export const getTimeDiff = (timeStrArray, unit) => {
  const latest = getMoment(timeStrArray[0])
  const oldest = getMoment(timeStrArray[timeStrArray.length - 1])
  return latest.diff(oldest, unit)
}