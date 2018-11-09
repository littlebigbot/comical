'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    const tags = queryInterface.addColumn('Comics', 'tags', {
      type: Sequelize.STRING,
      allowNull: false
    })

    const script = queryInterface.addColumn('Comics', 'script', {
      type: Sequelize.TEXT,
      allowNull: false
    })

    return Promise.all([ tags, script ]);
  },

  down: (queryInterface, Sequelize) => {

    const tags = queryInterface.removeColumn('Comics', 'tags')

    const script = queryInterface.removeColumn('Comics', 'script')

    return Promise.all([ tags, script ]);
  }
};
