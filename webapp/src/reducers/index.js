import { combineReducers } from 'redux';
import menuSetter from './menuSetter';
import timeRange from './timeRange';
import friends from './friends';


console.log('--------reducers index.js');
const twitterApp = combineReducers({
  menuSetter,
  friends,
  timeRange
})

export default twitterApp
