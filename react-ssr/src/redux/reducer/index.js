import { combineReducers } from 'redux';
import user from 'pages/user/reducer';
import product from 'pages/product/list/reducer';

export default combineReducers({
  user,
  product,
});
