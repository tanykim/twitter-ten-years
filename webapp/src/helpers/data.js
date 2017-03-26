/* data generation for visualization triggered by action */
import _ from 'lodash'
import Tweets from '../data/tweets.json'
import { TypeList } from './formatter'

/* timeline */

export const getTimelineData = () => {
  return require('../data/tweets_by_month.json');
}

//tweet types
const getCountsByTweetType = (types, tweets) => {
  return _.map(types, function(type) {
    const tweetsInType = _.filter(tweets, function(d) {
      return d[1].indexOf(type.charAt(0).toLowerCase()) > -1
    })
    return tweetsInType.length
  })
}

const getRestCount = (counts, total) => {
  return total - _.reduce(counts, function (sum, n) { return sum + n; }, 0);
}

const getTweetTypeData = (types, tweets, total) => {
  //get count by types
  const counts = getCountsByTweetType(types, tweets);
  //make a pair with type label
  const array = types.map((type, i) => {
    return [type, counts[i]];
  });
  //remove if the value is 0
  _.remove(array, (d) => d[1] === 0);
  //reverse order
  const ordered = _.sortBy(array, (d) => -d[1]);
  //add the rest count at the end
  ordered.push(['rest', getRestCount(counts, total)]);

  return ordered;
}

const getTypeForMatrix = (tweets, key) => {
  return _.chain(tweets)
    .groupBy((t) => key === 'day' ? +t[0].slice(-2) : +t[0].slice(10, -2)) //get day or hour
    .toPairs() //make an array
    .map((d) => [ +d[0],
      _.chain(d[1])
        .map((v) => v[1])
        .flatten()
        .countBy() //conunt by type
        .value()])
    .value();
}

export const getTweetsData = (range) => {

  //get tweets in the correct range
  const tInRange = _.filter(Tweets, (t) => {
    const ymd = t[0].substr(0, 10)
    return ymd >= range[0] && ymd <= range[1]
  })
  const total = tInRange.length

  //make nested array of 7 * 24 with 0 as day & hour
  let max = 0;
  const byDayHour = _.range(7).map(() => _.range(24).map(() => 0));
  const sum = {
    day: _.range(7).map(() => 0),
    hour: _.range(24).map(() => 0)
  };

  _.forEach(tInRange, (t) => {
    //get the part of day and hour from 'YYYY-MM-DD HH ww'format, then make it to integer
    const day = +t[0].slice(-2)
    const hour = +t[0].slice(10, -2)
    //then incread the number to matching point
    byDayHour[day][hour] += 1
    sum.day[day] += 1
    sum.hour[hour] += 1
    max = Math.max(max, byDayHour[day][hour])
  })

  //return e.g., [0: {m: 10, r:2}]
  //bar graph data by day or hour
  const matrixType = {
    day: getTypeForMatrix(tInRange, 'day'),
    hour: getTypeForMatrix(tInRange, 'hour')
  };

  //count tweets by type
  //make sure the order of types are same in python
  const interaction = getTweetTypeData(TypeList.interaction, tInRange, total);
  const media = getTweetTypeData(TypeList.media, tInRange, total);
  const language = getTweetTypeData(TypeList.language, tInRange, total);
  const source = getTweetTypeData(TypeList.source, tInRange, total);
  const byType = _.toPairsIn({ interaction, media, language, source });

  return { total, max, byDayHour, sum, byType, matrixType };
}

/* Flow */

export const getFlowData = () => {
  return require('../data/flow_data.json')
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