'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Document_types', {
      document_type_id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true
      },
      document_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdBy:{
        type:Sequelize.UUID
      },
      updatedBy:{
        type:Sequelize.UUID
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Document_types');
  }
};