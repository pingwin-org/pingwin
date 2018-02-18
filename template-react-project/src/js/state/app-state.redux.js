import {assign} from 'lodash';

const actions = {
  APPSTATE_INCREMENT: 'APPSTATE_INCREMENT',
};

const defaultState = {
  count: 0
};

export const createAction = {
  increment: () => ({
    type: actions.APPSTATE_INCREMENT,
  }),
};

export const reduce = (state = defaultState, action) => {
  switch (action.type) {
    case actions.APPSTATE_INCREMENT: {
      return assign({}, state, {count: state.count + 1});
    }
    default:
      return state;
  }
};
