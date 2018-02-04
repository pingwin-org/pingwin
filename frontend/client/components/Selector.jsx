import React from 'react';
import penguin from '../img/penguin.png';
import racket from '../img/racket.png';
import { Container, Row, Col } from 'reactstrap';

export default class Selector extends React.Component {
  render () {
    return (
      <Container>
        <Row>
          <Col className='container col-6 bg'>
            <img src={penguin} />
            <div className='overlay'>
              <h2>Users</h2>
              <p>Check out the rating of all other pingwinners. And more imporantantly, the rating of the best pingwinners.</p>
            </div>
          </Col>
          <Col className='container col-6 bg'>
            <img src={racket} />
            <div className='overlay'>
              <h2>Play!</h2>
              <p>Do you have another pingwinner to challenge in a game of table tennis?</p>
            </div>
          </Col>
        </Row>
      </Container>);
  }
}
