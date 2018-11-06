'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      post: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      titleText: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comics');
  }
};
