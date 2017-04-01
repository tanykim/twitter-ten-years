/* shared functions to calculate props/states */

const first = 'red';
const second = 'orange';
const third = 'green';
const last = 'grey';

const Colors = {
  'Korean': first,
  'English': second,
  'Big Screen': first,
  'Small Screen': second,
  'Mention': first,
  'Quote': second,
  'Retweet': third,
  'Photo': first,
  'Video': second,
  'rest': last,
  // 'matrix': '#603A91',
  '0': first,
  '1': second,
  '2': third,
  '3': last
};

const Grey = ['#333', '#666', '#999', '#aaa'];

export { Colors, Grey }