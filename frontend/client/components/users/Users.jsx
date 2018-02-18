import React from 'react';
import Menu from '../Menu.jsx';
import Footer from '../Footer.jsx';
import UserList from './UserList.jsx';
import AddUser from './AddUser.jsx';
import { Container } from 'reactstrap';

export default class Users extends React.Component {
  render () {
    return (
      <div>
        <Menu />
        <Container >
          <AddUser />
          <h3>Users</h3>
          <UserList />
        </Container>
        <Footer />
      </div>);
  }
}
