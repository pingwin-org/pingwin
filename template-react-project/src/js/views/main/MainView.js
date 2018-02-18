import React from 'react';
import {connect} from 'react-redux';

import {
  Row, Col, Container
} from 'reactstrap';
import {Button} from '../../components';

import {createAction} from './MainView.redux';

export const _MainView = (props) => (
  <Container>

    <Row style={{paddingTop: '10px', paddingLeft: '30px'}} >
      <Col sm="11">
        <h4>Been flipped {props.appState.count} times</h4>
      </Col>
      <Col sm="1">
        <Button
          color={props.view.flip ? 'success' : 'danger'}
          onClick={props.flip} >
          flip
        </Button>
      </Col>
    </Row>

  </Container>
);

const mapStateToProps = (state, ownProps) => ({
  appState: state.appState,
  view: state.views.main
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  flip: () => {
    dispatch(createAction.flip())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(_MainView);
