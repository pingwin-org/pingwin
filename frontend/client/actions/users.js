import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/users';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS';
export const ADD_USER = 'ADD_USER';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_ERROR = 'ADD_USER_ERROR';
export const NEW_USER = 'NEW_USER';
export const UPDATED_USER = 'UPDATED_USER';

function fetchUsersSuccess (users) {
  return {
    type: FETCH_USERS_SUCCESS,
    users
  }
}

function fetchUsersError (error) {
  return {
    type: FETCH_USERS_ERROR,
    error
  }
}

export function fetchUsers () {
  return function (dispatch) {
    dispatch({type: FETCH_USERS});
    return axios.get(apiUrl, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
      .then(response => {
        dispatch(fetchUsersSuccess(response.data));
      }, error => {
        console.error(error);
        dispatch(fetchUsersError(error));
      });
  }
}

function addUserSuccess (user) {
  return {
    type: ADD_USER_SUCCESS,
    user: user
  }
}

function addUserError (error) {
  return {
    type: ADD_USER_ERROR,
    error
  }
}

export function addUser (username) {
  return function (dispatch) {
    dispatch({type: ADD_USER});
    return axios.post(apiUrl, {
      username
    })
      .then((response) => {
        dispatch(addUserSuccess(response.data));
      }, (error) => {
        console.error(error);
        if (error.response && error.response.data) {
          dispatch(addUserError(error.response.data));
        } else {
          dispatch(addUserError(error));
        }
      });
  }
}

export function newUser (user) {
  return function (dispatch) {
    dispatch({
      type: NEW_USER,
      user: user
    });
  }
}

export function updatedUser (user) {
  return function (dispatch) {
    dispatch({
      type: UPDATED_USER,
      user: user
    });
  }
}
