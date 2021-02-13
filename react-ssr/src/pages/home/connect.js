import { connect } from 'react-redux';
import { changeMoreValueAction, getListAction } from './actions';
import Home from './index';

const mapStateToProps = (state) => {
  const { home } = state;
  return {
    list: home.list,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeMoreValue: (data) => dispatch(changeMoreValueAction(data)),
  getList: (data) => {
    dispatch(getListAction(data));
  },
});
const ConnectHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectHome;
