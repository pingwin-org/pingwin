import React from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

export default class MatchList extends React.Component {
  constructor () {
    super();
    this.state = {
      matches: null
    };
  }
  renderRatingGain (ratingGain) {
    const gain = ratingGain >= 0;
    return (<font color={gain ? "green" : "red"}>
      {gain ? "+" : "-"}{Math.abs(ratingGain)}
    </font>);
  }
  render () {
    let matchTable;
    if (this.state.matches) {
      matchTable = this.state.matches.map(match => {
        const winner = match.player1.username === match.winner ? match.player1 : match.player2;
        const loser = match.player1.username === match.winner ? match.player2 : match.player1;
        return <tr key={match._id}>
            <td>{new Date(match.date).toLocaleString()}</td>
            <td>{winner.username} ({winner.rating})</td>
            <td>{this.renderRatingGain(winner.ratingGain)}</td>
            <td>{loser.username} ({loser.rating})</td>
            <td>{this.renderRatingGain(loser.ratingGain)}</td>
          </tr>;
      });
    }
    return (<Table striped hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Winner</th>
            <th>Gain</th>
            <th>Loser</th>
            <th>Loss</th>
          </tr>
        </thead>
        {<tbody>{matchTable}</tbody> || 'loading users...'}
      </Table>);
  }
  componentDidMount () {
    axios.get('http://localhost:3000/api/matches', {
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
    .then(response => {
      this.setState({matches: response.data.sort((a, b) => {
        return b.date > a.date;
      })});
    })
    .catch(err => {
      console.error(err);
    });
  }
}
