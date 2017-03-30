/* shared functions to calculate props/states */

const first = 'red';
const second = 'orange';
const third = 'green';
const last = 'grey';

const Colors = {
  'Korean': first,
  'English': second,
  'Small Screen': first,
  'Big Screen': second,
  'Mention': first,
  'Retweet': third,
  'Quote': second,
  'Photo': first,
  'Video': second,
  'rest': last,
  '0': first,
  '1': second,
  '2': third,
  '3': last
};

const Grey = ['#333', '#666', '#999', '#aaa'];

export { Colors, Grey }