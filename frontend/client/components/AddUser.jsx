import React from 'react';
import axios from 'axios';

export default class AddUser extends React.Component {
  render () {
    return (
      <div>
        <h3>Add User</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Username</label>
            <input type="text" ref="username" />
          </div>
          <div>
            <label>Pin</label>
            <input type="password" ref="pin" />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>);
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.refs.username.value);
    console.log(this.refs.pin.value);
    axios.post('http://localhost:3000/api/users', {
      username: this.refs.username.value,
      pin: this.refs.pin.value
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

