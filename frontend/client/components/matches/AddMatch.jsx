import React from 'react';
import Menu from '../Menu.jsx';
import Footer from '../Footer.jsx';
import { connect } from 'react-redux';
import { addMatch } from '../../actions';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Button } from 'reactstrap';

// TODO: Select from userlist

class AddMatch extends React.Component {
  constructor () {
    super();
    // TODO: move this state into redux
    this.state = {
      form: {
        winner: '',
        loser: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  statusBox () {
    if (this.props.addingMatch === false && this.props.error === null) {
      return (<Alert color='info'>OK</Alert>);
    } else if (this.props.error) {
      return (<Alert color='warning'>{this.props.error}</Alert>);
    } else {
      return null;
    }
  }
  // TODO: This should be its own Component
  player (desc) {
    const userString = desc;
    return (
      <Col>
        <FormGroup>
          <Label style={{'textTransform': 'capitalize'}}>{userString}</Label>
          <Input type='select' name={userString} value={this.state.form[userString]} onChange={this.handleChange}>
            <option value={''}>Select player</option>
            {this.props.users && this.props.users.map(user => {
              return <option key={user._id} value={user.username}>{user.username}</option>
            })}
          </Input>
        </FormGroup>
      </Col>
    );
  }
  render () {
    return (
      <div>
        <Menu />
        <Container>
          <h3 style={{'textAlign': 'center'}} >Add Match</h3>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              {this.player('winner')}
              {this.player('loser')}
            </Row>
            <Button type='submit' color='success' value='Submit'>Submit</Button>
          </Form>
          {this.statusBox(this.state.status)}
        </Container>
      <Footer />
      </div>
    );
  }
  handleChange (event) {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    });
  }
  handleSubmit (event) {
    event.preventDefault();
    const f = this.state.form;
    // TODO: just map form to this instead?
    const matchObj = {
      winner: f.winner,
      loser: f.loser
    };
    this.props.addMatch(matchObj);
    // TODO: jump to match list on success
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    addMatch: (match) => {
      return dispatch(addMatch(match));
    }
  }
};

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    matches: state.match.matches,
    error: state.match.addMatchError,
    addingMatch: state.match.addingMatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMatch);
