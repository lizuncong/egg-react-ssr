import React from 'react';
import { renderRoutes } from 'react-router-config';

class CommonLayout extends React.Component {
  render() {
    const { route } = this.props;
    return (
      <div>
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

export default CommonLayout;
