import React from 'react'
import PropTypes from 'prop-types'

class User extends React.Component {
  render () {
    const calcWinrate = (wins, losses) => {
      return wins ? Math.round(wins / (wins + losses) * 100) / 100 : 0;
    }
    return (
      <tr>
        <td>{this.props.placement}</td>
        <td>{this.props.username}</td>
        <td>{this.props.rating}</td>
        <td>{this.props.wins}</td>
        <td>{this.props.losses}</td>
        <td>{calcWinrate(this.props.wins, this.props.losses)}</td>
      </tr>)
  }
}

User.propTypes = {
  placement: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  wins: PropTypes.number.isRequired,
  losses: PropTypes.number.isRequired
}

export default User;
