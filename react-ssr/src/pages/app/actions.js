import { CHANGE_MORE_VALUE } from './types';

export const changeMoreValueAction = (data) => ({
  type: CHANGE_MORE_VALUE,
  payload: data,
});

export const getUserInfoAction = (data) => (dispatch, getState, axios) => axios
  .get('/api/user', data)
  .then((res) => {
    console.log('app..', res.data.data.data);
    dispatch(
      changeMoreValueAction({
        userInfo: res.data.data.data,
      }),
    );
  });
