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

let generated = false;

const flow = (state = {}, action) => {
  if (action.type === 'SET_PAGE' && action.page === 'flow' && !generated) {
    const mentions = _.map(Friends, function(d, id) {
      return {
        name: d[1],
        points: getCountByMonth(d[0]),
        first: {text: d[2], at: d[0][d[0].length - 1]},
        count: d[0].length,
        id: id
      };
    });
    const max = maxCountByMax;
    const byCount = _.sortBy(_.map(Friends, function(d, id) {
      return [d[1], d[0].length]
    }), function(d) {
      return d[1]
    }).reverse().slice(0, 10);
    //for react-select option
    const friends = _.sortBy(_.map(Friends, function(d, key) {
      return { value: key, label: `@${d[1]}`, count: d[0].length };
    }), function(d) {
      return d.count * -1;
    });

    generated = true;

    return {mentions, max, byCount, friends};
  } else {
    return state;
  }
}

// let selected = -1;

const selectedFriend = (state = '0', action) => {
  if (action.type === 'SET_FLOW_FRIEND_ID') {
    console.log(action.id);
    return action.id;
  } else {
    return state;
  }
}

export { flow, selectedFriend }

// export default flow