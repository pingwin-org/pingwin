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
      console.log('got res');
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
