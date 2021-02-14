'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  /** ****************************用户相关路由**************************************/
  router.get('/api/user/list', controller.user.list);
  router.post('/api/user/create', controller.user.create);
  router.post('/api/user/del', controller.user.destroy);

  router.get('*', controller.serverRender.index.render);
};
