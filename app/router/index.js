'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  /** ****************************用户相关路由**************************************/
  router.get('user', '/api/user', controller.user.index);
  router.get('user', '/api/user/list', controller.user.index);

  router.get('*', controller.serverRender.index.render);
};
