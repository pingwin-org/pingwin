import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

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
      <div>
        <Navbar color='faded' light expand='lg'>
          <NavbarBrand href='/'>Pingwinner</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink disabled href='/game'>Play</NavLink>
              </NavItem>
              <NavItem>
                <NavLink active href='/users'>Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/matches'>Matches</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>);
  }
}
