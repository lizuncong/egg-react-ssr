'use strict';


module.exports = app => {
  const { STRING, DECIMAL } = app.Sequelize;

  const User = app.model.define('user', {
    userName: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
      // set (value) {
      //   this.setDataValue('password', md5(value))
      // }
    },
    phone: {
      type: STRING,
      allowNull: false,
      // unique: true // 这样定义索引会有问题
    },
    gender: {
      type: DECIMAL,
      allowNull: false,
      defaultValue: 1,
      comment: '性别(1男性，2女性 3保密)',
    },
    avatar: {
      type: STRING,
      comment: '头像',
    },
  });

  return User;
};
