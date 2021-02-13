const menuList = [
  {
    title: '首页',
    menuId: '1000',
    url: '/',
  },
  {
    title: '系统配置',
    menuId: '2000',
    url: '/system',
    children: [
      {
        title: '用户管理',
        menuId: '2001',
        url: '/system/user',
      },
    ],
  },
];
export default menuList;
