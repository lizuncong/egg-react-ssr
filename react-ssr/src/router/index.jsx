import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter, Switch, StaticRouter } from 'react-router-dom';
import routes from './routes';

export const ClientApp = () => (
  <BrowserRouter>
    <Switch>
      {renderRoutes(routes)}
    </Switch>
  </BrowserRouter>
);

export const ServerApp = ({ path, context }) => (
  <StaticRouter location={path} context={context}>
    <Switch>
      {renderRoutes(routes)}
    </Switch>
  </StaticRouter>
);
