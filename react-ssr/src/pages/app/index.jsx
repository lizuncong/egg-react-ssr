import React from 'react';
import { renderRoutes } from 'react-router-config';

class Index extends React.PureComponent {
  render() {
    const { route } = this.props;
    return renderRoutes(route.routes);
  }
}

export default Index;
