import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Favicon from 'react-favicon';

import penguin from '../img/penguin.png';
import Front from './Front.jsx';
import AddMatch from './matches/AddMatch.jsx';
import Matches from './matches/Matches.jsx';
import Users from './users/Users.jsx';

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Favicon url={penguin} />
        <Switch>
          <Route exact path='/' component={Front} />
          <Route path='/play' component={AddMatch} />
          <Route path='/matches' component={Matches} />
          <Route path='/users' component={Users} />
        </Switch>
      </div>);
  }
}
