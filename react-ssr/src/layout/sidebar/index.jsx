import React from 'react';
import { renderRoutes } from 'react-router-config';
import NavLeft from './navLeft';
import Header from './header';
import styles from './index.module.less';

class SideBarLayout extends React.Component {
  render() {
    const { route } = this.props;
    return (
      <div className={styles.container}>
        <NavLeft />
        <div className={styles.main}>
          <Header />
          {renderRoutes(route.routes)}
        </div>
      </div>
    );
  }
}

export default SideBarLayout;
