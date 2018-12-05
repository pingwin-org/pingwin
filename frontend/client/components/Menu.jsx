import React from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

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
      <Navbar style={{backgroundColor: '#98b89f'}} className='fixed-top' light expand='md'>
        <NavbarBrand tag={RRNavLink} to='/'>Pingwin</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='ml-auto' navbar pills>
            <NavItem>
              <NavLink tag={RRNavLink} to='/play'>Play</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/users'>Users</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/matches'>Matches</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/stats/users'>User Stats</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>);
  }
}
