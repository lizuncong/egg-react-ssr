'use strict';


module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Product = app.model.define('product', {
    name: {
      type: STRING,
      allowNull: false,
    },
    price: {
      type: INTEGER,
      allowNull: false,
    },
    image: {
      type: STRING,
      defaultValue: 'http://localhost:7001/public/imgs/default-01.png',
    },
    status: {
      type: STRING,
      allowNull: false,
      defaultValue: 1,
      comment: '状态(1上架，2下架)',
    },
    description: {
      type: STRING,
      allowNull: false,
    },
  });

  return Product;
};
