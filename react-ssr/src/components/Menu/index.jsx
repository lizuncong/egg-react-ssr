import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import IconFont from '../Icon';

const { SubMenu } = Menu;

class IMenu extends React.Component {
  // 菜单渲染
  renderMenu(data) {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu
            title={item.title}
            key={item.url}
            icon={item.icon ? <IconFont type={item.icon} /> : ' '}
          >
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.url}>
          <NavLink to={item.url}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  }

  render() {
    const { selectedKeys, menuData, onClick } = this.props;
    return (
      <Menu
        onClick={(menuItem) => onClick(menuItem)}
        selectedKeys={selectedKeys}
        mode="inline"
        theme="light"
        expandIcon={<IconFont type="icondown" />}
      >
        {this.renderMenu(menuData)}
      </Menu>
    );
  }
}

export default IMenu;
