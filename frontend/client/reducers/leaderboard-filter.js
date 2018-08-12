import {
  SET_LEADERBOARD_FILTER
} from '../actions/leaderboard-filter'

const initialState = {
  dayToLastMatch: 10
};

const leaderboardFilter = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEADERBOARD_FILTER:
      return Object.assign({}, state, {
        dayToLastMatch: action.days
      })
    default:
      return state
  }
}

export default leaderboardFilter
