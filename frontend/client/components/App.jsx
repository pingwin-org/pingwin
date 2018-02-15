import React from 'react';
import { Route } from 'react-router';
import Favicon from 'react-favicon';

import penguin from '../img/penguin.png';
import Front from './Front.jsx';
import Matches from './Matches.jsx';
import Users from './Users.jsx';
import Dev from './Dev.jsx';

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Favicon url={penguin} />
        <Route path='/front' component={Front} />
        <Route path='/matches' component={Matches} />
        <Route path='/users' component={Users} />
        <Route path='/temp-dev' component={Dev} />
        <a href='/temp-dev'>CLICK ME</a>
      </div>);
  }
}
