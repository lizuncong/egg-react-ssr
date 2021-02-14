import React from 'react';
import loadable from '@loadable/component';
import { Redirect } from 'react-router-dom';

import { getUserListAction } from 'pages/user/actions';
import { getProductListAction } from 'pages/product/list/actions';

const SideBarLayout = loadable(() => import(/* webpackChunkName: 'sideBarLayout' */ '../layout/sidebar'));
const Home = loadable(() => import(/* webpackChunkName: 'home' */ '../pages/home'));
const Login = loadable(() => import(/* webpackChunkName: 'login' */ '../pages/login/connect'));
const User = loadable(() => import(/* webpackChunkName: 'user' */ '../pages/user/connect'));
const ProductList = loadable(() => import(/* webpackChunkName: 'productList' */ '../pages/product/list/connect'));
const NotFound = loadable(() => import(/* webpackChunkName: 'notFound' */ '../pages/not-found'));

const routes = [
  {
    component: NotFound,
    title: '404',
    path: '/404',
    status: 404,
  },
  {
    title: '登录页',
    description: '这是一个登录页哦',
    path: '/login',
    component: Login,
  },
  {
    title: '侧边栏布局',
    description: '这是一个侧边栏布局，有菜单的',
    path: '/',
    component: SideBarLayout,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
        title: '首页',
        description: '这是我的首页',
      },
      {
        path: '/system/user',
        component: User,
        title: '用户',
        description: '这是用户页',
        loadData: async (store) => store.dispatch(getUserListAction()),
      },
      {
        path: '/product/list',
        component: ProductList,
        title: '商品管理列表页',
        description: '这是商品管理列表页',
        loadData: async (store) => store.dispatch(getProductListAction()),
      },
      {
        render: () => <Redirect to="/404" />,
      },
    ],
  },
];

export default routes;
