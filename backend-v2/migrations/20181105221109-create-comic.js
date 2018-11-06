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
        type: Sequelize.STRING
      },
      post: {
        type: Sequelize.TEXT
      },
      slug: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      titleText: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATE
      },
      deleted: {
        type: Sequelize.BOOLEAN
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
