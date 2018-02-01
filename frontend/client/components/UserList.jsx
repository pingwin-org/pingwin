import React from 'react';
import axios from 'axios';

export default class UserList extends React.Component {
  constructor () {
    super();
    this.state = {
      users: null
    };
  }
  render () {
    let userList;
    if (this.state.users) {
      const listItems = this.state.users.map(user => {
        return <li key={user._id}>{user.username} ({user.rating} rating)</li>;
      });
      userList = <ol>{listItems}</ol>;
    }
    return (
      <div>
        <h2>Users</h2>
        {userList || 'loading users...'}
      </div>);
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
