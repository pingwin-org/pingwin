import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

import App from './components/App.jsx';
import './scss/main.scss';
import penguin from './img/penguin.png';
import Favicon from 'react-favicon';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    {/*<Favicon url={penguin} />*/}
    <App />
  </Provider>
  , document.getElementById('root'));
