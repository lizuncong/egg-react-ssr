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
    },
    status: {
      type: STRING,
      allowNull: false,
      comment: '状态(1上架，2下架)',
    },
    description: {
      type: STRING,
      allowNull: false,
    },
  });

  return Product;
};
