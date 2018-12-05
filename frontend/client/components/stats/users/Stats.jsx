import React from 'react';
import { Container } from 'reactstrap';
import { Chart } from 'react-charts';
import { connect } from 'react-redux';
import Menu from '../../Menu.jsx';
import Footer from '../../Footer.jsx';

class UserStats extends React.Component {
  render () {
    const getRaitingData = (users, matches) => {
      let data = users.reduce((dataMap, user) => {
        console.log(user);
        dataMap[user.username] = {
          label: user.username,
          data: [],
        };
        return dataMap;
      }, {});
      console.log(data);
      matches.forEach(m => {
        data[m.player1.username].data.push([new Date(m.createdAt), m.player1.newRating]);
        data[m.player2.username].data.push([new Date(m.createdAt), m.player2.newRating]);
      });
      return Object.values(data);
    }
    return (
      <div>
        <Menu />
        <Container style={{width: '100em', height: '40em'}}>
          <h3>User Stats</h3>
          <h2>Overall raiting</h2>
          <Chart
            data={
              getRaitingData(this.props.users, this.props.matches)
            }
            axes={[
              { primary: true, type: 'time', position: 'bottom' },
              { type: 'linear', position: 'left' }
            ]}
            tooltip
          />
        </Container>
        <Footer />
      </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    matches: state.match.matches,
  }
}

export default connect(
  mapStateToProps,
)(UserStats)
