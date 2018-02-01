import React from 'react';
import axios from 'axios';

export default class MatchList extends React.Component {
  constructor () {
    super();
    this.state = {
      matches: null
    };
  }
  render () {
    let matchList;
    if (this.state.matches) {
      const listItems = this.state.matches.map(match => {
        return <li key={match._id}>
          {match.date}<br />
          {match.player1.username} {match.player1.rating} + {match.player1.ratingGain}<br />
          {match.player2.username} {match.player2.rating} + {match.player2.ratingGain}<br />
          Winner: {match.winner}<br />
        </li>;
      });
      matchList = <ol>{listItems}</ol>;
    }
    return (
      <div>
        <h2>Matches</h2>
        {matchList || 'loading matches...'}
      </div>);
  }
  componentDidMount () {
    axios.get('http://localhost:3000/api/matches', {
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
    .then(response => {
      this.setState({matches: response.data.sort((a, b) => {
        return a.date > b.date;
      })});
    })
    .catch(err => {
      console.error(err);
    });
  }
}

