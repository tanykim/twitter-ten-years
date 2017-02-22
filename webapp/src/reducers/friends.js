import _ from 'underscore'
import moment from 'moment'
import Friends from './../data/friends.json'

let maxCountByMax = 0;

function getCountByMonth(data) {
  return _.map(_.groupBy(data, function(d) {
    return moment(d.substr(0, 19), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM');
  }), function(d, key) {
    maxCountByMax = Math.max(maxCountByMax, d.length);
    return [key, d.length];
  });
}

let generated = null;

const friends = (state = {}, action) => {
  if (action.type === 'SET_PAGE' && action.page === 'flow' && _.isNull(generated)) {
    const mentions = _.map(Friends, function(d, id) {
      return {id: id, points: getCountByMonth(d[0]), selected: false};
    });
    const max = maxCountByMax;
    const byCount = _.sortBy(_.map(Friends, function(d, id) {
      return [d[1], d[0].length]
    }), function(d) {
      return d[1]
    }).reverse().slice(0, 10);
    generated = state;
    console.log(max);
    return {mentions, max, byCount};
  } else {
    return state;
  }
}

// const highlightedFriend = (state = -1, action) => {
//   console.log(action.type, action.id);
//   if (action.type === 'HIGHLIGHT_FLOW_LINE' && action.id > -1) {
//     console.log(action.id);
//     return action.id;
//   } else {
//     return state;
//   }
// }

// export { friends, highlightedFriend }

export default friends