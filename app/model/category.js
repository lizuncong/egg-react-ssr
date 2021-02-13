'use strict';


module.exports = app => {
  const { STRING } = app.Sequelize;

  const Category = app.model.define('category', {
    name: {
      type: STRING,
      allowNull: false,
    },
    code: {
      type: STRING,
      allowNull: false,
    },
  });

  return Category;
};
