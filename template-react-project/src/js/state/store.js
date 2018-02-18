import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './root-reducer';

//
// NODE_ENV is always available
// console.log('env = ', process.env.NODE_ENV);
//
// REACT_APP_BIG_BAD_WOLF is defined in <root>/.env
// console.log('REACT_APP_BIG_BAD_WOLF = ', process.env.REACT_APP_BIG_BAD_WOLF);
//

const middleware = [thunk];
if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger());
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware),
);

export default store;
