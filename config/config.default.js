/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1613103303697_5239';

  // add your middleware config here
  config.middleware = [ 'loginCheck', 'errorHandler' ];
  config.errorHandler = {
    match: '/api',
  };
  config.jwt = {
    secret: 'lzc_jwt_secret',
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root123456', // lzc
      // 数据库名
      database: 'mt_admin',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // config.security = {
  //   csrf: {
  //     enable: false,
  //   },
  // };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'mt_admin',
    password: 'root123456', // lzc
    define: {
      // freezeTableName: true, // 表名和model名一致
      timestamps: false, // 不自动给表添加created_at，updated_at
    },
  };
  config.static = {
    dir: [
      path.join(appInfo.baseDir, 'app/public'),
      path.join(appInfo.baseDir, 'dist'),
    ],
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
