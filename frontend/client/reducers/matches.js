const matches = (state = {}, action) => {
  switch(action.type) {
    case 'FETCH_MATCHES':
      return Object.assign({}, state, {
        fetchingMatches: true,
        fetchMatchesError: null
      });
    case 'FETCH_MATCHES_SUCCESS':
      return Object.assign({}, state, {
        fetchingMatches: false,
        fetchMatchesError: null,
        matches: action.matches
      });
    case 'FETCH_MATCHES_ERROR':
      return Object.assign({}, state, {
        fetchingMatches: false,
        fetchMatchesError: action.error
      });
    case 'ADD_MATCH':
      return Object.assign({}, state, {
        addingMatch: true,
        addMatchError: null
      });
    case 'ADD_MATCH_SUCCESS':
      return Object.assign({}, state, {
        addingMatch: false,
        addMatchError: null
      });
    case 'ADD_MATCH_ERROR':
      return Object.assign({}, state, {
        addingMatch: false,
        addMatchError: action.error
      });
    default:
      return state;
  }
};

export default matches;
