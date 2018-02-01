import React from 'react';
import logo from '../img/pingwin.png';
import Highscore from './Highscore.jsx';
import AddUser from './AddUser.jsx';

export default class App extends React.Component {
  render () {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Hello Pingwinner!</h1>
        <img src={logo} height='200' />
        <Highscore />
        <AddUser />
      </div>);
  }
}
