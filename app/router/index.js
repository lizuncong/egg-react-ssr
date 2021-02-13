'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  /** ****************************用户相关路由**************************************/
  router.resources('user', '/api/user', controller.user);

  router.get('*', controller.serverRender.render);
};
