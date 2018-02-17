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
        const winner = match.player1.username === match.winner ? match.player1 : match.player2;
        const loser = match.player1.username === match.winner ? match.player2 : match.player1;
        return <tr key={match._id}>
            <td>{new Date(match.date).toISOString()}</td>
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
        {<tbody>{matchTable}</tbody> || 'loading matches... this does not work haha'}
      </Table>);
  }
}

const mapStateToProps = (state) => {
  return {matches: state.match.matches}
};

export default connect(mapStateToProps)(MatchList);
