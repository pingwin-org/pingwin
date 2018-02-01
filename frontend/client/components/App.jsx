import React from 'react';
import logo from '../img/pingwin.png';
import UserList from './UserList.jsx';
import MatchList from './MatchList.jsx';
import AddUser from './AddUser.jsx';

export default class App extends React.Component {
  render () {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Hello Pingwinner!</h1>
        <img src={logo} height='200' />
        <UserList />
        <AddUser />
        <MatchList />
      </div>);
  }
}
