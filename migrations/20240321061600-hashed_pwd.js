'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'hashed_pwd', {
      type: Sequelize.STRING,
      allowNull: true, // Modify as per your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'hashed_pwd');
  },
};