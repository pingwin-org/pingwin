import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
// Bootstrap v4 wrappen in some custom scss
import './scss/main.scss';
// Redux (Data store for the client)
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { fetchUsers, fetchMatches } from './actions';
import reducers from './reducers';
// Thunk (API-calls etc.)
import thunkMiddleware from 'redux-thunk';
// react-router-redux (Connect user location-history with state, used for development mainly)
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
// react-alert (pop-up alerts for user feedback)
import { Provider as AlertProvider } from 'react-alert';
import { Alert, defaultOptions } from './components/Alert.jsx';

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
    <AlertProvider template={Alert} {...defaultOptions}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </AlertProvider>
  </Provider>
  , document.getElementById('root'));
