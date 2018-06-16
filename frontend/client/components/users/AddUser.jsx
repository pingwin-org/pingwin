import React from 'react';
import ReactDOM from 'react-dom';
import Plus from 'react-icons/lib/io/plus-round';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import { addUser } from '../../actions';

class AddUser extends React.Component {
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
      </div>);
  }
  handleSubmit(e) {
    e.preventDefault();
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    this.props.addUser(username);
    // this.props.alert.show(JSON.stringify(err));
    // TODO: clear input fields on ADD_USER_SUCCESS
    // TODO: jump to user list on success
  }
  componentWillReceiveProps (newProps) {
    if (newProps.userWasAdded !== this.props.userWasAdded && newProps.userWasAdded) {
      this.props.alert.show('User successfully added!');
    }
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
  return {
    error: state.user.addUserError,
    userWasAdded: state.user.userWasAdded
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withAlert(AddUser));
