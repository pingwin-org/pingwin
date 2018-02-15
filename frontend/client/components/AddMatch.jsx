import React from 'react';
import axios from 'axios';
import { Alert, Button } from 'reactstrap';

export default class AddMatch extends React.Component {
  constructor () {
    super();
    this.state = {
      status: null
    };
  }
  statusBox() {
    if (this.state.status === 'OK') {
      return (<Alert color='info'>OK</Alert>);
    } else if (typeof this.state.status === 'string') {
      return (<Alert color='warning'>{this.state.status}</Alert>);
    } else {
      return null;
    }
  }
  render () {
    return (
      <div>
        <h3>Add Match</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Player 1</label>
            <div>
              <label>Username</label>
              <input type='text' ref='username1' />
            </div>
            <div>
              <label>Pin</label>
              <input type='password' ref='pin1' />
            </div>
            <div>
              <label>Player 2</label>
              <div>
                <label>Username</label>
                <input type='text' ref='username2' />
              </div>
              <div>
                <label>Pin</label>
                <input type='password' ref='pin2' />
              </div>
              <div>
                <label>Winner:</label><br />
                <input type='text' ref='winner' />
              </div>
            </div>
          </div>
          <Button type='submit' value='Submit'>Submit</Button>
        </form>
        {this.statusBox()}
      </div>);
  }
  handleSubmit (e) {
    e.preventDefault();
    let obj = {
      player1: {
        username: this.refs.username1.value,
        pin: this.refs.pin1.value
      },
      player2: {
        username: this.refs.username2.value,
        pin: this.refs.pin2.value
      },
      winner: this.refs.winner.value
    };
    console.log(obj);
    axios.post('http://localhost:3000/api/matches', obj)
    .then((response) => {
      this.setState({status: "OK"});
      this.refs.pin1.value = null;
      this.refs.pin2.value = null;
      console.log(response);
    })
    .catch((error) => {
      if (error.response || error.response.data) {
        this.setState({status: error.response.data});
      } else {
        this.setState({status: error});
      }
      console.log(error);
      window.scrollTo(0, document.body.scrollHeight); // scroll down to display error
    });
  }
}

