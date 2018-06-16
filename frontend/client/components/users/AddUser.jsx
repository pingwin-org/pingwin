import React from 'react';
import ReactDOM from 'react-dom';
import Plus from 'react-icons/lib/io/plus-round';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { addUser } from '../../actions';

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
            <Label id="addUserLabel">Add User</Label>{' '}
            <Input type="text" placeholder="Username" ref="username" />
            <Button type="submit" color="success" value="Submit"><Plus /></Button>
          </FormGroup>
        </Form>
        {this.statusBox()}
      </div>);
  }
  handleSubmit(e) {
    e.preventDefault();
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    this.props.addUser(username);
    // TODO: clear input fields on ADD_USER_SUCCESS
    // TODO: jump to user list on success
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (username) => {
      return dispatch(addUser(username));
    }
  }
};

const mapStateToProps = (state) => {
  return {error: state.user.addUserError}
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
