import users from './users'
import matches from './matches'
import leaderboardFilter from './leaderboard-filter'
import { routerReducer } from 'react-router-redux'

const reducers = {
  user: users,
  match: matches,
  leaderboardFilter,
  router: routerReducer
}

export default reducers
