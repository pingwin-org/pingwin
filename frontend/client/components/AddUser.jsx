import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class AddUser extends React.Component {
  constructor () {
    super();
    this.state = {
      error: null
    };
  }
  render () {
    return (
      <div>
        <Form inline onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup>
            <Label>Add User</Label>{' '}
            <Input type="text" placeholder="Username" ref="username"/>
            <Input type="password" placeholder="Pin" ref="pin"/>
            <Button type="submit" value="Submit">Submit</Button>
          </FormGroup>
        </Form>
        <font color="red">
          {this.state.error && this.state.error.toString()}
        </font>
      </div>);
  }
  handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/api/users', {
      username: ReactDOM.findDOMNode(this.refs.username).value,
      pin: ReactDOM.findDOMNode(this.refs.pin).value
    })
    .then((response) => {
      this.setState({error: null});
      console.log(response);
    })
    .catch((error) => {
      if (error.response || error.response.data) {
        this.setState({error: error.response.data});
      } else {
        this.setState({error});
      }
      console.log(error);
    });
  }
}
