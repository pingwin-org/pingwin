import users from './users';
import matches from './matches';
import { routerReducer } from 'react-router-redux';

const reducers = {
  user: users,
  match: matches,
  router: routerReducer
};

export default reducers;
