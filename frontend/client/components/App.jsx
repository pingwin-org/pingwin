import React from 'react';
import Menu from './Menu.jsx';
import Selector from './Selector.jsx';
import UserList from './UserList.jsx';
import MatchList from './MatchList.jsx';
import AddUser from './AddUser.jsx';
import AddMatch from './AddMatch.jsx';
import { Container } from 'reactstrap';

export default class App extends React.Component {
  render () {
    return (
      <Container>
        <Menu />
        <Selector />
        <UserList />
        <AddUser />
        <MatchList />
        <AddMatch />
      </Container>);
  }
}
