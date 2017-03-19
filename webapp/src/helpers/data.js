/* data generation for visualization triggered by action */
import _ from 'lodash'
import { formatToYearMonth, getTimeDiff } from './formatter'

export const getTimelineData = () => {
  const byMonth = require('../data/tweets_by_month.json')
  return { byMonth }
}

let maxCountByMonth = 0;

function getCountByMonth(data) {
  return _.map(_.groupBy(data, function(d) {
    return formatToYearMonth(d);
  }), function(d, key) {
    maxCountByMonth = Math.max(maxCountByMonth, d.length);
    return [key, d.length];
  });
}

export const getFlowData = () => {

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

function findRank(list, id) {
  let rankedNo = 0;
  let selectedVal;

  //find the rank of the selected id: list is already sorted
  for (let i = 0; i < list.length; i++) {
    if (list[i][0] === id) {
      rankedNo = i;
      selectedVal = list[i][2]
      break;
    }
  }

  //find if there are ties, then increase the rank
  if (rankedNo > 0) {
    for (let i = 1; i < rankedNo + 1; i++) {
      if (list[rankedNo - i][2] === selectedVal) {
        rankedNo -= 1;
      } else {
        break;
      }
    }
  }

  //index starts from 0, rank starts from 1, so +1
  return rankedNo + 1;
}

export const getFriendObj = (mentions, ranking, id) => {
  const selected = _.filter(mentions, ['id', id])[0];
  const count = findRank(ranking.count, id);
  const duration = findRank(ranking.duration, id);

  selected.ranking = { count, duration };

  return selected;
}