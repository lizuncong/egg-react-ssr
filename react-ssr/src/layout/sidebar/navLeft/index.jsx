import React from 'react';
import Menu from 'components/Menu';
import styles from './index.module.less';
import menus from '../../../config/menus';

class NavLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuData: menus,
      currentUrl: '',
    };
  }

  componentDidMount() {
    const currentUrl = window.location.pathname;
    this.setState({
      currentUrl,
    });
  }

  handleClick(menuItem) {
    this.setState({
      currentUrl: menuItem.key,
    });
  }

  render() {
    const { currentUrl, menuData } = this.state;
    return (
      <div className={styles.navLeftContent}>
        <div className={styles.logo}>
          {/* <img src="/assets/logo-ant.svg" alt="" /> */}
          <h1>MTAdmin</h1>
        </div>
        <Menu
          menuData={menuData}
          mode="inline"
          theme="dark"
          selectedKeys={[currentUrl]}
          onClick={(menuItem) => this.handleClick(menuItem)}
        />
      </div>
    );
  }
}

export default NavLeft;
