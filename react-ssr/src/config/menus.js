const menuList = [
  {
    title: '系统配置',
    menuId: '1000',
    url: '/system',
    children: [
      {
        title: '用户管理',
        menuId: '1001',
        url: '/system/user',
      },
    ],
  },
  {
    title: '商品管理',
    menuId: '2000',
    url: '/product',
    children: [
      {
        title: '商品列表',
        menuId: '2001',
        url: '/product/list',
      },
    ],
  },
];
export default menuList;
