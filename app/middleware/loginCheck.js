'use strict';

// 登陆验证
module.exports = () => {
  // const whiteList = []; // 白名单，在白名单中的路由可以跳过登陆验证
  return async (ctx, next) => {
    const isLogin = true;
    if (!isLogin) {
      ctx.body = {
        status: 500,
        errMsg: '用户未登陆',
      };
      return;
    }
    await next();
  };
};
