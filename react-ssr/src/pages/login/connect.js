import { connect } from 'react-redux';
import Login from './index';

const mapStateToProps = (state) => {
  const { app } = state;
  return {
    userInfo: app.userInfo,
  };
};
const ConnectLogin = connect(mapStateToProps)(Login);

export default ConnectLogin;
