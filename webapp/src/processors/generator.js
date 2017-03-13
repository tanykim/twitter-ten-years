/* data generation for visualization triggered by action */
import _ from 'lodash'
// import Tweets from '../data/tweets.json'
// import Friends from '../data/friends.json'
import { formatToYearMonth, getTimeDiff } from './formatter'

let maxCountByMonth = 0;

function getCountByMonth(data) {
  return _.map(_.groupBy(data, function(d) {
    return formatToYearMonth(d);
  }), function(d, key) {
    maxCountByMonth = Math.max(maxCountByMonth, d.length);
    return [key, d.length];
  });
}

const getTimelineData = () => {
  const tweets = require('../data/tweets.json');
  const months = tweets.map((t) => t[0].substr(0, 7))
  return { tweets, byMonth: getCountByMonth(months) }
}

const getFlowData = () => {

  const Friends = require('../data/friends.json')
  //main graph
  const mentions = _.map(Friends, function(d, id) {
    return {
      name: d[1],
      points: getCountByMonth(d[0]),
      first: d[0][d[0].length - 1],
      count: d[0].length,
      duration: getTimeDiff(d[0], 'days'),
      id: +id
    };
  });
  //y axis max tick
  const max = maxCountByMonth;

  //histogram
  const histogram = _.zipObject(['count', 'duration'],
    _.unzip(_.map(mentions, function(m) {
      return [m.count, m.duration]
    })));

  const friends = _.sortBy(mentions, ['count']).reverse().map(
    (m) => _.zipObject(['value', 'label', 'count'], [m.id, `@${m.name}`, m.count]))

  //top friends
  const ranking = {
    count: _.sortBy(mentions, ['count']).reverse().map((m) => [m.id, m.name, m.count]),
    duration:_.sortBy(mentions, ['duration']).reverse().map((m) => [m.id, m.name, m.duration])
  }

  return {mentions, max, histogram, friends, ranking}
}

export { getTimelineData, getFlowData }