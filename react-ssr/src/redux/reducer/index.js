import { combineReducers } from 'redux';
import home from 'pages/home/reducer';
import app from 'pages/app/reducer';

export default combineReducers({
  app,
  home,
});
