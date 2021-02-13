import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// // import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducer';
import { clientAxios, serverAxios } from '../../request';

export const getServerStore = (ctx) => createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(serverAxios(ctx))),
);

export const getClientStore = () => {
  const initialState = window.INITIAL_STATE || {};
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk.withExtraArgument(clientAxios)),
  );
};
