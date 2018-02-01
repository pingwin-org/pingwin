import React from 'react';
import axios from 'axios';

export default class AddMatch extends React.Component {
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
          <input type='submit' value='Submit' />
        </form>
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
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
