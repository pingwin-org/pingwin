import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import { Provider as AlertProvider } from 'react-alert';
import { Alert, options } from './components/Alert.jsx';

import { fetchUsers, fetchMatches } from './actions';
import reducers from './reducers';
import App from './components/App.jsx';
import './scss/main.scss';

const history = createHistory();
const store = createStore(
  combineReducers({
    user: reducers.users,
    match: reducers.matches,
    router: routerReducer
  }),
  applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware
  )
);

store.dispatch(fetchUsers());
store.dispatch(fetchMatches());

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={Alert} {...options}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </AlertProvider>
  </Provider>
  , document.getElementById('root'));
