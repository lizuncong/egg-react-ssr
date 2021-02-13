'use strict';

const BaseService = require('./base');

class Service extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = 'User';
  }
}

module.exports = Service;
