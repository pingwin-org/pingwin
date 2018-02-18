import React from 'react';
import ReactDOM from 'react-dom';
import {_MainView as MainView} from './MainView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainView />, div);
});
