import {assign} from 'lodash';

import {createAction as createAppStateAction} from '../../state/app-state.redux';

const actions = {
  VIEWS_MAIN_FLIP: 'VIEWS_MAIN_FLIP',
};

const defaultView = {
  flip: true,
};

export const createAction = {
  // uses thunk, which allows us to
  // create secondary effects (s.a. increment) and async stuff
  flip: ()  => (dispatch) => {
    dispatch(createAppStateAction.increment());
    dispatch({
      type: actions.VIEWS_MAIN_FLIP,
    });
  },
  // bypasses thunk middleware (but does not increment appState.count)
  // flip: () => ({
  //   type: actions.VIEW_FLIP,
  // }),
};

export const reduce = (state = defaultView, action) => {
  switch (action.type) {
    case actions.VIEWS_MAIN_FLIP: {
      return assign({}, state, {flip: !state.flip});
    }
    default:
      return state;
  }
};
