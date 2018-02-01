import React from 'react';
import penguin from '../img/penguin.png';
import pingwin from '../img/pingwin.png';
import racket from '../img/racket.png';
import rackets from '../img/rackets.png';
import UserList from './UserList.jsx';
import MatchList from './MatchList.jsx';
import AddUser from './AddUser.jsx';
import AddMatch from './AddMatch.jsx';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      usersImg: penguin,
      matchesImg: racket
    };
    this.usersHover = this.usersHover.bind(this);
    this.matchesHover = this.matchesHover.bind(this);
  }
  usersHover (e) {
    this.setState(prevState => ({
      usersImg: prevState.usersImg === penguin ? pingwin : penguin
    }));
  }
  matchesHover (e) {
    this.setState(prevState => ({
      matchesImg: this.state.matchesImg === racket ? rackets : racket
    }));
  }
  render () {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Hello Pingwinner!</h1>
        <img src={this.state.usersImg} onMouseEnter={this.usersHover} onMouseLeave={this.usersHover} height='200' width='200' />
        <img src={this.state.matchesImg} onMouseEnter={this.matchesHover} onMouseLeave={this.matchesHover} height='200' width='200' />
        <UserList />
        <AddUser />
        <MatchList />
        <AddMatch />
      </div>);
  }
}
