import React from 'react';

export class Alert extends React.Component {
  render () {
    // the style contains only the margin given as offset
    // options contains all given options
    // message is the alert message
    // close is a function that closes the alert
    const { style, options, message, close } = this.props;

    return (
      <div style={style}>
        {options.type === 'info' && '!'}
        {options.type === 'success' && ':)'}
        {options.type === 'error' && ':('}
        {message}
        <button onClick={close}>X</button>
      </div>
    );
  }
}

export const options = {
  position: 'top right',
  timeout: 10000,
  offset: '30px',
  transition: 'scale'
};
