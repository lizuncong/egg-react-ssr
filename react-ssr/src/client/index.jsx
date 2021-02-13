import React from 'react';
import ReactDom from 'react-dom';
import { loadableReady } from '@loadable/component';
import { Provider } from 'react-redux';
import { ClientApp } from '../router';
import { getClientStore } from '../redux/store';
import '../style/global.less';

loadableReady(() => {
  const store = getClientStore();
  const root = document.getElementById('root');
  ReactDom.hydrate(
    <Provider store={store}>
      <ClientApp />
    </Provider>,
    root,
  );
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}
