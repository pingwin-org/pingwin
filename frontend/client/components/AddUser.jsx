import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default class AddUser extends React.Component {
  constructor () {
    super();
    this.state = {
      error: null
    };
  }
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
          <Button type='submit' value='Submit'>Submit</Button>
        </form>
        <font color="red">
          {this.state.error && this.state.error.toString()}
        </font>
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
    .then((response) => {
      this.setState({error: null});
      console.log(response);
    })
    .catch((error) => {
      if (error.response || error.response.data) {
        this.setState({error: error.response.data});
      } else {
        this.setState({error});
      }
      console.log(error);
    });
  }
}
