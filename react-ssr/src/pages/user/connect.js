import { connect } from 'react-redux';
import { changeMoreValueAction, getUserListAction } from './actions';
import User from './index';

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    list: user.list,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeMoreValue: (data) => dispatch(changeMoreValueAction(data)),
  getList: (data) => {
    dispatch(getUserListAction(data));
  },
});
const ConnectHome = connect(mapStateToProps, mapDispatchToProps)(User);

export default ConnectHome;
