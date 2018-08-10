import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

class UserList extends React.Component {
  render () {
    const getWinrate = (wins, losses) => {
      return wins ? Math.round(wins / (wins + losses) * 100) / 100 : 0;
    };
    let userTable;
    if (this.props.users) {
      userTable = this.props.users.map((user, i) => {
        return (<tr key={user._id}>
          <td>{i + 1}</td>
          <td>{user.username}</td>
          <td>{user.rating}</td>
          <td>{user.wins}</td>
          <td>{user.losses}</td>
          <td>{getWinrate(user.wins, user.losses)}</td>
        </tr>);
      });
    }
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
        {<tbody>{userTable}</tbody> || 'loading users...'}
      </Table></div>);
  }
}

const mapStateToProps = (state) => {
  return {users: state.user.users};
};

export default connect(mapStateToProps)(UserList);
