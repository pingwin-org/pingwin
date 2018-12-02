import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  NEW_USER,
  UPDATED_USER,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR
} from '../actions/users'

import _ from 'lodash';

const initialState = {
  users: []
};

const addSingleUser = (users, user) => {
  return _.uniqBy(users.concat(user), (u) => {
    return u._id;
  });
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return Object.assign({}, state, {
        fetchingUsers: true,
        fetchUsersError: null
      });
    case FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        fetchingUsers: false,
        fetchUsersError: null,
        users: action.users
      });
    case FETCH_USERS_ERROR:
      return Object.assign({}, state, {
        fetchingUsers: false,
        fetchUsersError: action.error
      });
    case NEW_USER:
      return Object.assign({}, state, {
        userWasAdded: false,
        addingUser: true,
        addUserError: null,
        users: addSingleUser(state.users, action.user)
      });
    case UPDATED_USER:
      let users = [...state.users];
      users = _.filter(users, (u) => {
        return u._id !== action.user._id;
      });
      users.push(action.user);
      return Object.assign({}, state, {
        userWasAdded: false,
        addingUser: true,
        addUserError: null,
        users: users
      });
    case ADD_USER:
      return Object.assign({}, state, {
        userWasAdded: false,
        addingUser: true,
        addUserError: null
      });
    case ADD_USER_SUCCESS:
      return Object.assign({}, state, {
        userWasAdded: true,
        addingUser: false,
        addUserError: null,
        users: addSingleUser(state.users, action.user)
      });
    case ADD_USER_ERROR:
      return Object.assign({}, state, {
        userWasAdded: false,
        addingUser: false,
        addUserError: action.error
      });
    default:
      return state;
  }
}

export default users;
