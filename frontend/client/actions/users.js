import axios from 'axios';

function fetchUsersSuccess(users) {
  return {
    type: 'FETCH_USERS_SUCCESS',
    users
  }
}

function fetchUsersError(error) {
  return {
    type: 'FETCH_USERS_ERROR',
    error
  }
}

export function fetchUsers() {
  return function (dispatch) {
    dispatch({type: 'FETCH_USERS'});
    return axios.get('http://localhost:3000/api/users', {
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

function addUserSuccess() {
  return {
    type: 'ADD_USER_SUCCESS'
  }
}

function addUserError(error) {
  return {
    type: 'ADD_USER_ERROR',
    error
  }
}

export function addUser (username) {
  return function (dispatch) {
    dispatch({type: 'ADD_USER'});
    return axios.post('http://localhost:3000/api/users', {
      username
    })
    .then((response) => {
      dispatch(fetchUsers());
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
