import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import './scss/main.scss';
import penguin from './img/penguin.png';
import Favicon from 'react-favicon';

ReactDOM.render(
  <div>
    <Favicon url={penguin} />
    <App />
  </div>
  , document.getElementById('root'));
