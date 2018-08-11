import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import User from './User.jsx';
import { updateLeaderboardFilter } from '../../actions';

class UserList extends React.Component {
  render () {
    return (
      <div><Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Rating</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Winrate</th>
          </tr>
        </thead>
        <tbody>
          {this.props.users.map((user, index) => (
            <User key={user._id} {...user} placement={index + 1} />
          ))}
        </tbody>
      </Table></div>);
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.user.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLeaderboardFilterUpdate: filterName => {
      dispatch(updateLeaderboardFilter(filterName))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList)
