import _ from 'underscore'

const getFriendObj = (lines, id) => {
  return _.filter(lines, function (d) {
    return d.id === id;
  })[0];
}

export { getFriendObj };