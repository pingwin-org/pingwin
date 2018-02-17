import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux'
import { addUser } from '../actions'

class AddUser extends React.Component {
  statusBox () {
    if (this.props.error) {
      return (<Alert color='warning'>{this.props.error}</Alert>);
    } else {
      return null;
    }
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
        {this.statusBox()}
      </div>);
  }
  handleSubmit(e) {
    e.preventDefault();
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    const pin = ReactDOM.findDOMNode(this.refs.pin).value;
    this.props.addUser(username, pin);
    // TODO: clear input fields on ADD_USER_SUCCESS
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (username, pin) => {
      return dispatch(addUser(username, pin));
    }
  }
};

const mapStateToProps = (state) => {
  return {error: state.user.addUserError}
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
