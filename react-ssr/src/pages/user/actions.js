import { userListApi } from 'api/user';
import CHANGE_MORE_VALUE from './types';

export const changeMoreValueAction = (data) => ({
  type: CHANGE_MORE_VALUE,
  payload: data,
});

export const getListAction = () => (dispatch, getState, axios) => axios.get(userListApi)
  .then((res) => {
    dispatch(
      changeMoreValueAction({
        list: res.data.list || [],
      }),
    );
  });
