import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/users';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS';
export const ADD_USER = 'ADD_USER';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_ERROR = 'ADD_USER_ERROR';

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

export function fetchUsers() {
  return function (dispatch) {
    dispatch({type: FETCH_USERS_SUCCESS});
    return axios.get(apiUrl, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
      .then(response => {
        const users = response.data.sort((a, b) => {
          return b.rating - a.rating;
        });
        dispatch(fetchUsersSuccess(users));
      }, error => {
        console.error(error);
        dispatch(fetchUsersError(error));
      });
  }
}

function addUserSuccess () {
  return {
    type: ADD_USER_SUCCESS
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
        dispatch(addUserSuccess());
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
