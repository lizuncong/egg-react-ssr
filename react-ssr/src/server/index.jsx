import React from 'react';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerApp } from '../router';
import { getServerStore } from '../redux/store';
import Html from './html';
import routes from '../router/routes';

const renderHtml = async ({ ctx, context }) => {
  const statsFile = path.resolve(__dirname, './web/assets/loadable-stats-web.json');
  // 根据url获取需要渲染的路由，react-router-config是个好东西
  const matchedRoutes = matchRoutes(routes, ctx.url);

  const mRoute = matchedRoutes[matchedRoutes.length - 1] || {};

  const route = mRoute.route || {};

  const store = getServerStore(ctx);

  const promises = [];

  matchedRoutes.forEach((item) => {
    if (item.route.loadData) {
      const promise = new Promise((resolve) => {
        // loadData别忘了接受store哦
        item.route.loadData(store).then(resolve).catch(resolve);
      });
      promises.push(promise);
    }
  });

  // 等待所有的loadData执行完毕，此时store已经初始化完毕
  await Promise.all(promises);
  // 此时store已经初始化完毕
  const state = store.getState();

  const webExtractor = new ChunkExtractor({ statsFile, entrypoints: ['client'] });

  const jsx = webExtractor.collectChunks(
    <Provider store={store}>
      <ServerApp path={ctx.url} context={context} />
    </Provider>,
  );

  const content = renderToString(jsx);

  const data = {
    title: route.title || '',
    description: route.description || '',
    scriptTags: webExtractor.getScriptElements(),
    linkTags: webExtractor.getLinkElements(),
    styleTags: webExtractor.getStyleElements(),
    state,
    children: content,
    cssLinks: [
      // "https://cdnjs.cloudflare.com/ajax/libs/antd/4.0.1/antd.min.css"
    ],
  };

  const html = renderToStaticMarkup(<Html {...data} />);
  return `<!doctype html>${html}`;
};
export default renderHtml;
