import React from 'react';
import axios from 'axios';
import Menu from './Menu.jsx';
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

export default class AddMatch extends React.Component {
  constructor () {
    super();
    this.state = {
      status: null,
      form: {
        username1: '',
        pin1: '',
        username2: '',
        pin2: '',
        winner: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  statusBox (status) {
    const color = status === 'OK' ? 'success' : 'warning';
    if (color && typeof status === 'string') {
      return (<Alert color={color}>{status}</Alert>);
    } else {
      return null;
    }
  }
  playerInput (nbr) {
    const userString = 'username' + nbr;
    const pinString = 'pin' + nbr;
    return (
      <Col>
        <FormGroup>
          <Label>{'Player ' + nbr}</Label>
          <Input type='text' name={userString} value={this.state.form[userString]} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Pin</Label>
          <Input type='password' name={pinString} value={this.state.form[pinString]} onChange={this.handleChange} />
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
              {this.playerInput(1)}
              {this.playerInput(2)}
            </Row>
            <FormGroup>
              <Label>
                Winner
              </Label>
              <Input type='select' name='winner' onChange={this.handleChange}>
                <option value={''}>Select a winner</option>
                <option value={this.state.form.username1}>{this.state.form.username1}</option>
                <option value={this.state.form.username2}>{this.state.form.username2}</option>
              </Input>
            </FormGroup>
            <Button type='submit' value='Submit'>Submit</Button>
          </Form>
          {this.statusBox(this.state.status)}
        </Container>
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
    const matchObj = {
      player1: {
        username: f.username1,
        pin: f.pin1
      },
      player2: {
        username: f.username2,
        pin: f.pin2
      },
      winner: f.winner
    };
    console.log(matchObj);
    axios.post('http://localhost:3000/api/matches', matchObj)
    .then((response) => {
      this.setState({status: 'OK'});
      this.state.form.pin1 = '';
      this.state.form.pin2 = '';
      console.log(response);
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        this.setState({status: error.response.data});
      }
      console.log(error);
      window.scrollTo(0, document.body.scrollHeight); // scroll down to display error
    });
  }
}
