'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    };
  }
  error(error) {
    this.ctx.body = {
      code: 1,
      error,
    };
  }

  async list() {
    const { ctx, service } = this;
    const { pageNum, pageSize, ...where } = ctx.query;
    const pNo = isNaN(pageNum) ? 1 : parseInt(pageNum);
    const pSize = isNaN(pageSize) ? 10 : parseInt(pageSize);
    const result = await service[this.entity].list(pNo, pSize, where);
    this.success(result);
  }

  async create() {
    const { ctx, service } = this;
    const entity = ctx.request.body;
    const result = await service[this.entity].create(entity);
    result ? this.success(result) : this.error('创建失败');
  }

  // async update() {
  //   const { ctx, service } = this;
  //   const id = ctx.params.id;
  //   const entity = ctx.request.body;
  //   entity.id = id;
  //   const result = await service[this.entity].update(entity);
  //   result ? this.success(result) : this.error('更新失败');
  // }

  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.request.body;
    const result = await service[this.entity].destroy(id);
    result ? this.success(result) : this.error('删除失败');
  }


}

module.exports = BaseController;
