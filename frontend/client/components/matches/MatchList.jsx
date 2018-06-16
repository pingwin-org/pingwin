import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux'

class MatchList extends React.Component {
  renderRatingGain (ratingGain) {
    const gain = ratingGain >= 0;
    return (<font color={gain ? "green" : "red"}>
      {gain ? "+" : "-"}{Math.abs(ratingGain)}
    </font>);
  }
  render () {
    let matchTable;
    if (this.props.matches) {
      matchTable = this.props.matches.map(match => {
        let winner, loser;
        if (match.winner) {
          winner = match.player1.username === match.winner ? match.player1 : match.player2;
          loser = match.player1.username === match.winner ? match.player2 : match.player1;
        } else {
          winner = match.player1.winner ? match.player1 : match.player2;
          loser = match.player2.winner ? match.player1 : match.player2;
        }
        const n = 'numeric';
        return <tr key={match._id}>
            <td>{new Date(match.date ? match.date : match.createdAt).toLocaleString('en-GB', {hour12: false, day: n, month: n, hour: n, minute: n})}</td>
            <td>{winner.username} ({winner.rating || winner.newRating})</td>
            <td>{this.renderRatingGain(winner.ratingGain || winner.ratingDiff)}</td>
            <td>{loser.username} ({loser.rating || loser.newRating})</td>
            <td>{this.renderRatingGain(loser.ratingGain || loser.ratingDiff)}</td>
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
        {<tbody>{matchTable}</tbody> || 'loading matches... this does not work haha'}
      </Table>);
  }
}

const mapStateToProps = (state) => {
  return {matches: state.match.matches}
};

export default connect(mapStateToProps)(MatchList);
