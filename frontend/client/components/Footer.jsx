import React from 'react';
import git from '../img/github.png';
import { Card, CardFooter } from 'reactstrap';

export default class Footer extends React.Component {
  render () {
    return (
      <footer>
        <Card>
          <CardFooter style={{'textAlign': 'center'}}>
            <p>
              <a href='https://github.com/DOhlsson/pingwin'>
                <img src={git} /> All your stars are belong to us!
              </a>
            </p>
          </CardFooter>
        </Card>
      </footer>);
  }
}
