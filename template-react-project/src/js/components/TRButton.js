import React from 'react';
import {Button} from 'reactstrap';

export default (props) => (
  <Button
    color={props.color}
    onClick={props.onClick} >
    {props.children}
  </Button>
);
