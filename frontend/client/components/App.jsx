import React from 'react';
import logo from '../img/penguin.png'

export default class App extends React.Component {
  render () {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Hello Pingwinner!</h1>
        <img src={logo} />
      </div>);
  }
}
