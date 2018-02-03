import React from 'react';
import penguin from '../img/penguin.png';
import racket from '../img/racket.png';
import UserList from './UserList.jsx';
import MatchList from './MatchList.jsx';
import AddUser from './AddUser.jsx';
import AddMatch from './AddMatch.jsx';
import { Grid, Row, Col, Image } from 'react-bootstrap';

export default class App extends React.Component {
  render () {
    return (
      <Grid>
        <Grid>
          <Row>
            <Col className='container col-6 bg'>
              <Image src={penguin} />
              <div className='overlay'>
                <h2>Users</h2>
                <p>Check out the rating of all other pingwinners. And more imporantantly who's in the toplist.</p>
              </div>
            </Col>
            <Col className='container col-6 bg'>
              <Image src={racket} />
              <div className='overlay'>
                <h2>Play!</h2>
                <p>Do you have another pingwinner to challenge in a game of table tennis?</p>
              </div>
            </Col>
          </Row>
        </Grid>
        <UserList />
        <AddUser />
        <MatchList />
        <AddMatch />
      </Grid>);
  }
}
