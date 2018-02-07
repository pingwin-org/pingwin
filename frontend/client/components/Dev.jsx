import React from 'react';
import { Container } from 'reactstrap';

import Menu from './Menu.jsx';
import Front from './Front.jsx';
import UserList from './UserList.jsx';
import MatchList from './MatchList.jsx';
import AddUser from './AddUser.jsx';
import AddMatch from './AddMatch.jsx';
import Footer from './Footer.jsx';

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Menu />
        <Container>
          <Front />
          <UserList />
          <AddUser />
          <MatchList />
          <AddMatch />
        </Container>
        <Footer />
      </div>);
  }
}
