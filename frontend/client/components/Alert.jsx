import React from 'react';

import {
  Row,
  Container,
  Alert as StrapAlert } from 'reactstrap';

export class Alert extends React.Component {
  render () {
    // the style contains only the margin given as offset
    // options contains all given options
    // message is the alert message
    // close is a function that closes the alert
    const { color, options, message, close } = this.props;
    const style = { 'max-width': '15em' };

    return (
      <StrapAlert className='pt-0' style={style} color={color || 'info'} options={options}>
        <Row className='justify-content-end'>
          <button onClick={close} type='button' className='close'>
            <span>&times;</span>
          </button>
        </Row>
        <Row>
          <Container>
            {message}
          </Container>
        </Row>
      </StrapAlert>
    );
  }
}

export const defaultOptions = {
  position: 'top right',
  timeout: 10000,
  offset: '30px',
  transition: 'scale'
};
