/* data generation for visualization triggered by action */
import _ from 'lodash'
import Tweets from '../data/tweets.json'

export const getTimelineData = () => {
  return require('../data/tweets_by_month.json')
}

//tweet types
const getCountsByTweetType = (types, tweets) => {
  return _.map(types, function(type) {
    const tweetsInType = _.filter(tweets, function(d) {
      return d[1].indexOf(type) > -1
    })
    return tweetsInType.length
  })
}

//language or device
const getCountsByTweetProp = (idx, tweets) => {
  return _.chain(tweets)
    .map((d) => d[idx])
    .countBy()
    .toPairs()
    .sortBy((d) => -d[1]) //order by count desc
    .fromPairs()
    .omit('und') //remove undefined
    .value()
}

export const getTweetsData = (range) => {

  //get tweets in the correct range
  const tInRange = _.filter(Tweets, (t) => {
    const ymd = t[0].substr(0, 10)
    return ymd >= range[0] && ymd <= range[1]
  })
  const total = tInRange.length

  //make nested array of 7 * 24 with 0 as day & hour
  let max = 0
  const byDayHour = _.range(7).map(() => _.range(24).map(() => 0))
  _.forEach(tInRange, (t) => {
    //get the part of day and hour from 'YYYY-MM-DD HH ww'format, then make it to integer
    const day = +t[0].slice(-2)
    const hour = +t[0].slice(10, -2)
    //then incread the number to matching point
    byDayHour[day][hour] += 1
    max = Math.max(max, byDayHour[day][hour])
  })

  //interaction - types: mention, retweet, quote
  const interactionCounts = getCountsByTweetType(['m', 'r', 'q'], tInRange)
  const interaction = _.zipObject(['mention', 'retweet', 'quote'], interactionCounts)

  //media - types: photo, video
  const mediaCounts = getCountsByTweetType(['p', 'v'], tInRange)
  const media = _.zipObject(['photo', 'video'], mediaCounts)

  //language is the 3rd element in tweet [time, types, language, device]
  const language = getCountsByTweetProp(2, tInRange)
  const device = getCountsByTweetProp(3, tInRange)

  return { total, max, byDayHour, interaction, media, language, device }
}

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