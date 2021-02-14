import { connect } from 'react-redux';
import { changeMoreValueAction, getProductListAction } from './actions';
import Product from './index';

const mapStateToProps = (state) => {
  const { product } = state;
  return {
    list: product.list,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeMoreValue: (data) => dispatch(changeMoreValueAction(data)),
  getList: (data) => {
    dispatch(getProductListAction(data));
  },
});
const ConnectHome = connect(mapStateToProps, mapDispatchToProps)(Product);

export default ConnectHome;
