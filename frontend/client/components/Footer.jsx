import React from 'react';
import GitCat from 'react-icons/lib/io/social-github';
import { Card, CardFooter } from 'reactstrap';

export default class Footer extends React.Component {
  render () {
    return (
      <footer>
        <Card>
          <CardFooter style={{'textAlign': 'center'}}>
            <a href='https://github.com/DOhlsson/pingwin'>
              <GitCat /> All your stars are belong to us!
            </a>
          </CardFooter>
        </Card>
      </footer>);
  }
}
