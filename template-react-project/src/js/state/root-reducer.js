import {combineReducers} from 'redux';

import views from '../views/combined-views-reducer';
import {reduce as appState} from './app-state.redux';

export default combineReducers({
  views,
  appState,
});
