import { combineReducers } from 'redux';
import users from './users';
import matches from './matches';

const reducers = combineReducers({
  users,
  matches
});

export default reducers;
