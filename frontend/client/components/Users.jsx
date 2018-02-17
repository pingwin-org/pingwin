import React from 'react';
import Menu from './Menu.jsx';
import UserList from './UserList.jsx';
import { Container } from 'reactstrap';

export default class Users extends React.Component {
  render () {
    return (
      <div>
        <Menu />
        <Container>
          <UserList />
        </Container>
      </div>);
  }
}
