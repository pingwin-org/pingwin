import React from 'react';
import axios from 'axios'; // TODO remove
import { Table } from 'reactstrap';

export default class UserList extends React.Component {
  constructor () {
    super();
    this.state = {
      users: null
    };
  }
  render () {
    let userTable;
    if (this.state.users) {
      userTable = this.state.users.map((user, i) => {
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
  componentDidMount () {
    axios.get('http://localhost:3000/api/users', {
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
    .then(response => {
      this.setState({users: response.data.sort((a, b) => {
        return b.rating - a.rating;
      })});
    })
    .catch(err => {
      console.error(err);
    });
  }
}
