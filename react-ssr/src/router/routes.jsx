import React from 'react';
import loadable from '@loadable/component';
import { Redirect } from 'react-router-dom';

import { getListAction } from 'pages/home/actions';
import { getUserInfoAction } from 'pages/app/actions';

const App = loadable(() => import(/* webpackChunkName: 'app' */ '../pages/app/connect'));
const SideBarLayout = loadable(() => import(/* webpackChunkName: 'sideBarLayout' */ '../layout/sidebar'));
// const CommonLayout = loadable(() => import(/* webpackChunkName: 'commonLayout' */ '../layout/common'));
const Home = loadable(() => import(/* webpackChunkName: 'home' */ '../pages/home/connect'));
const Login = loadable(() => import(/* webpackChunkName: 'login' */ '../pages/login/connect'));
const User = loadable(() => import(/* webpackChunkName: 'user' */ '../pages/user'));
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
    title: '',
    description: '',
    path: '/',
    component: App,
    loadData: async (store) => store.dispatch(getUserInfoAction()),
    routes: [

      {
        title: '侧边栏布局',
        description: '这是一个侧边栏布局，有菜单的',
        path: '/',
        component: SideBarLayout,
        routes: [
          {
            path: '/',
            component: Home,
            title: '首页',
            description: '这是我的首页',
            loadData: async (store) => store.dispatch(getListAction()),
          },
          {
            path: '/system/user',
            component: User,
            title: '用户',
            description: '这是用户页',
          },
          {
            render: () => <Redirect to="/404" />,
          },
        ],
      },
    ],
  },
];

export default routes;
