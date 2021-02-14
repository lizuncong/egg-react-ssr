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
  router.post('/api/user/update', controller.user.update);
  /** ****************************商品相关路由**************************************/
  router.get('/api/product/list', controller.product.list);
  router.post('/api/product/create', controller.product.create);
  router.post('/api/product/del', controller.product.destroy);
  router.post('/api/product/update', controller.product.update);

  router.get('*', controller.serverRender.index.render);
};
