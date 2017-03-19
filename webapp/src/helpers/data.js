/* data generation for visualization triggered by action */
import _ from 'lodash'

export const getTimelineData = () => {
  return require('../data/tweets_by_month.json')
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