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
    for (let i = 0; i < list.length; i++) {
      const user = list[i];
      const resources = await this.app.mysql.query(
        `select resources.* from resources
        inner join role_resources on resources.id = role_resources.resource_id
        inner join role_users on role_resources.role_id = role_users.role_id
        where role_users.user_id = ?`,
        [ user.id ]
      );
      user.resources = resources;
    }
    const total = await this.app.mysql.count(this.entity, where);
    return {
      list,
      total,
    };
  }
}

module.exports = Service;
