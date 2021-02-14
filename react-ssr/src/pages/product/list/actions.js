import { productListApi } from 'api/product';
import CHANGE_MORE_VALUE from './types';

export const changeMoreValueAction = (data) => ({
  type: CHANGE_MORE_VALUE,
  payload: data,
});

export const getProductListAction = () => (dispatch, getState, axios) => axios.get(productListApi)
  .then((res) => {
    dispatch(
      changeMoreValueAction({
        list: res.data.list || [],
      }),
    );
  });
