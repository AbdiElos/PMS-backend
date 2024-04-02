'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sectors', {
      sector_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      
      },
      leader_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.STRING,
        allowNull: true,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sectors');
  }
};
