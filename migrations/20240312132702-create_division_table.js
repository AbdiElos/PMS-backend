'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Divisions', {
      division_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        
      },
      sector_id:{
          type: Sequelize.UUID,
          references: {
            model: 'Sectors', // The name of the referenced model
            key: 'sector_id' // The name of the referenced column in the Roles table
          }
        },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      head_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('Divisions');
  }
};
