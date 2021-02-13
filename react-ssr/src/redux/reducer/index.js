import { combineReducers } from 'redux';
import home from 'pages/home/reducer';
import user from 'pages/user/reducer';

export default combineReducers({
  home,
  user,
});
