'use strict';

const { Service } = require('egg');

class BaseService extends Service {
  async list(pageNum, pageSize, where) {
    const ctx = this.ctx;
    const result = await ctx.model[this.entity].findAndCountAll({
      limit: pageSize,
      offset: (pageNum - 1) * pageSize,
      where,
      order: [
        [ 'id', 'asc' ],
        [ 'createdAt', 'asc' ],
      ],
    });
    return {
      list: result.rows,
      count: result.count,
    };
  }

  async create(entity) {
    return await this.ctx.model[this.entity].create(entity);
  }

  async update(entity) {
    const ctx = this.ctx;
    const instance = await ctx.model[this.entity].findByPk(entity.id);
    await instance.update(entity);
    return instance;
  }

  async destroy(id) {
    const ctx = this.ctx;
    const idTemp = Number(id);
    const instance = await ctx.model[this.entity].findByPk(idTemp);
    if (!instance) {
      ctx.status = 404;
      return;
    }
    return await instance.destroy();
  }
}

module.exports = BaseService;
