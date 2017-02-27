import _ from 'underscore'
import Friends from '../data/friends.json'
import { formatToYearMonth, getTimeDiff } from '../processors/formatter'

let maxCountByMonth = 0;

function getCountByMonth(data) {
  return _.map(_.groupBy(data, function(d) {
    return formatToYearMonth(d);
  }), function(d, key) {
    maxCountByMonth = Math.max(maxCountByMonth, d.length);
    return [key, d.length];
  });
}

let generated = false;

//default props when Flow page is loaded
const flow = (state = {}, action) => {
  if (action.type === 'SET_PAGE' && action.page === 'flow' && !generated) {

    //main graph
    const mentions = _.map(Friends, function(d, id) {
      return {
        name: d[1],
        points: getCountByMonth(d[0]),
        first: {text: d[2], at: d[0][d[0].length - 1]},
        count: d[0].length,
        duration: getTimeDiff(d[0], 'days'),
        id: +id
      };
    });
    //y axis max tick
    const max = maxCountByMonth;

    //histogram - filter friends more than 1 mentions
    const histogram = _.object(['count', 'duration'].map((t) => {
      return [t, _.filter(mentions, function(d) {
          return d.count > 1;
        }).map((m) => m[t])];
    }));

    //for react-select option
    const friends = _.sortBy(_.map(Friends, function(d, id) {
      return { value: +id, label: `@${d[1]}`, count: d[0].length };
    }), function(d) {
      return d.count * -1;
    });

    //top friends
    const ranking = {
      count: _.sortBy(_.map(Friends, function(d, id) {
          return [+id, d[1], d[0].length];
        }), function(d) {
          return d[2] * -1;
        }),
      duration: _.sortBy(_.map(Friends, function(d, id) {
          return [+id, d[1], getTimeDiff(d[0], 'days')];
        }), function(d) {
          return d[2] * -1;
        })
    }

    generated = true;
    return {mentions, max, histogram, friends, ranking};
  } else {
    return state;
  }
}

//props triggered by user interaction
const selectedFriend = (state = 0, action) => {
  if (action.type === 'SET_FLOW_FRIEND_ID') {
    console.log(action.id);
    return action.id;
  } else {
    return state;
  }
}

export { flow, selectedFriend }