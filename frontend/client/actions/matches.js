import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/matches';

export const FETCH_MATCHES = 'FETCH_MATCHES';
export const FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS';
export const FETCH_MATCHES_ERROR = 'FETCH_MATCHES';
export const ADD_MATCH = 'ADD_MATCH';
export const ADD_MATCH_SUCCESS = 'ADD_MATCH_SUCCESS';
export const ADD_MATCH_ERROR = 'ADD_MATCH_ERROR';

function fetchMatchesSuccess (matches) {
  return {
    type: FETCH_MATCHES_SUCCESS,
    matches
  }
}

function fetchMatchesError (error) {
  return {
    type: FETCH_MATCHES_ERROR,
    error
  }
}

function getTime(obj) {
  return new Date(obj.date ? obj.date : obj.createdAt).getTime()
}

export function fetchMatches () {
  return function (dispatch) {
    dispatch({type: FETCH_MATCHES});
    return axios.get(apiUrl, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
      .then(response => {
        const matches = response.data.sort((a, b) => {
          const aTime = getTime(a);
          const bTime = getTime(b);
          return bTime - aTime;
        });
        dispatch(fetchMatchesSuccess(matches));
      }, error => {
        console.error(error);
        dispatch(fetchMatchesError(error));
      });
  }
}

function addMatchSuccess () {
  return {
    type: ADD_MATCH_SUCCESS
  }
}

function addMatchError (error) {
  return {
    type: ADD_MATCH_ERROR,
    error
  }
}

export function addMatch (match) {
  return function (dispatch) {
    dispatch({type: ADD_MATCH});
    return axios.post(apiUrl, match)
      .then((response) => {
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
