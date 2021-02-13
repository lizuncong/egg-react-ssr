'use strict';

/**
 * 应用通用处理
 */

class AppBootHook {
  constructor(app) {
    this.app = app;

    app.beforeStart(async () => {
      await app.model.sync({
        alter: process.env.NODE_ENV === 'development', // 当前开发环境的时候每次重刷测试数据库
      });
    });
  }
}

module.exports = AppBootHook;
