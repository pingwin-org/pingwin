import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Menu extends React.Component {
  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render () {
    return (
      <Navbar style={{backgroundColor: '#ffbaba'}}className='fixed-top' light expand='lg'>
        <NavbarBrand tag={Link} to='/'>Pingwinner</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={Link} to='/play'>Play</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/users'>Users</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/matches'>Matches</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>);
  }
}
