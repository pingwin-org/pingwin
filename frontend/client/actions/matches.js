import axios from 'axios';

function fetchMatchesSuccess(matches) {
  return {
    type: 'FETCH_MATCHES_SUCCESS',
    matches
  }
}

function fetchMatchesError(error) {
  return {
    type: 'FETCH_MATCHES_ERROR',
    error
  }
}

export function fetchMatches() {
  return function (dispatch) {
    dispatch({type: 'FETCH_MATCHES'});
    return axios.get('http://localhost:3000/api/matches', {
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
    .then(response => {
      const matches = response.data.sort((a, b) => {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        return bDate - aDate;
      });
      dispatch(fetchMatchesSuccess(matches));
    }, error => {
      console.error(error);
      dispatch(fetchMatchesError(error));
    });
  }
}

export function addMatch() {
  return function (dispatch) {
    dispatch({type: 'ADD_MATCH'});
  }
}
