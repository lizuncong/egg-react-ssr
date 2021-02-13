import { connect } from 'react-redux';
import { changeMoreValueAction, getUserInfoAction } from './actions';
import App from './index';

const mapStateToProps = (state) => {
  const { app } = state;
  return {
    userInfo: app.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeMoreValue: (data) => dispatch(changeMoreValueAction(data)),
  getUserInfo: (data) => {
    dispatch(getUserInfoAction(data));
  },
});
const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectApp;
