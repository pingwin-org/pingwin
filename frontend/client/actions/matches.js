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

function addMatchSuccess(matches) {
  return {
    type: 'ADD_MATCH_SUCCESS'
  }
}

function addMatchError(error) {
  return {
    type: 'ADD_MATCH_ERROR',
    error
  }
}

export function addMatch(match) {
  return function (dispatch) {
    dispatch({type: 'ADD_MATCH'});
    return axios.post('http://localhost:3000/api/matches', match)
    .then((response) => {
      dispatch(fetchMatches());
      dispatch(addMatchSuccess());
    }, (error) => {
      console.error(error);
      if (error.response && error.response.data) {
        dispatch(addMatchError(error.response.data));
      } else {
        dispatch(addMatchError(error));
      }
    });
  }
}
