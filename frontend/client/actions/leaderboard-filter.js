export const SET_LEADERBOARD_FILTER = 'SET_LEADERBOARD_FILTER'

export function setLeaderboardFilter (days) {
  return {
    type: SET_LEADERBOARD_FILTER,
    days
  }
}
