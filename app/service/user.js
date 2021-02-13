'use strict';

const BaseService = require('./base');

class Service extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = 'users';
  }

  async list(pageNum, pageSize, where) {
    const list = await this.app.mysql.select(this.entity, {
      where,
      order: [
        [ 'id', 'asc' ],
        [ 'created_at', 'asc' ],
      ],
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
    });
    const total = await this.app.mysql.count(this.entity, where);
    return {
      list,
      total,
    };
  }
}

module.exports = Service;
