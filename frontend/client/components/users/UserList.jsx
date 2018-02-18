import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux'

class UserList extends React.Component {
  render () {
    let userTable;
    if (this.props.users) {
      userTable = this.props.users.map((user, i) => {
        return <tr key={user._id}>
            <td>{i + 1}</td>
            <td>{user.username}</td>
            <td>{user.rating}</td>
            <td>{user.wins}</td>
            <td>{user.losses === 0 ? 'Yes' : 'No'}</td>
          </tr>;
      });
    }
    return (<div><Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Rating</th>
            <th>Wins</th>
            <th>Undefeated</th>
          </tr>
        </thead>
        {<tbody>{userTable}</tbody> || 'loading users...'}
      </Table></div>);
  }
}

const mapStateToProps = (state) => {
  return {users: state.user.users}
};

export default connect(mapStateToProps)(UserList);
