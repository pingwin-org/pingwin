import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import Favicon from 'react-favicon';

import reducers from './reducers';
import App from './components/App.jsx';
import './scss/main.scss';
import penguin from './img/penguin.png';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path='/' component={App} />
        <Favicon url={penguin} />
      </div>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
