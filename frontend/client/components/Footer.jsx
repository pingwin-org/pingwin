import React from 'react';
import GitCat from 'react-icons/lib/io/social-github';

export default class Footer extends React.Component {
  render () {
    const style = {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      textAlign: 'center',
      backgroundColor: '#ffbaba'
    };
    return (
      <footer style={style}>
        <a href='https://github.com/DOhlsson/pingwin'>
          <GitCat /> All your stars are belong to us!
        </a>
      </footer>);
  }
}
