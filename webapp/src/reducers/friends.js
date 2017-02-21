import _ from 'underscore';
import moment from 'moment';
import Friends from './../data/friends.json';

let maxCountByMax = 0;

function getCountByMonth(data) {
  return _.map(_.groupBy(data, function(d) {
    return moment(d.substr(0, 19), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM');
  }), function(d, key) {
    maxCountByMax = Math.max(maxCountByMax, d.length);
    return [key, d.length];
  });
}

//state friends - used in flow
console.log('--------------friends.js');

const friends = (obj = Friends, action) => {
  // console.log(action.type, action.menu);
  // if (action.type === 'SET_MENU' && action.menu === 'flow') {
    const mentions = _.map(obj, function(d, id) {
      return {id: id, points: getCountByMonth(d[0]), selected: false};
    });
    const max = maxCountByMax;
    const byCount = _.sortBy(_.map(obj, function(d, id) {
      return [d[1], d[0].length]
    }), function(d) {
      return d[1]
    }).reverse().slice(0, 10);
    console.log(byCount);
    return {mentions, max, byCount};
  // } else {
  //   return {};
  // }
};

export default friends;
