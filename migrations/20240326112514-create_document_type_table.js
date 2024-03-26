'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Document_types', {
      document_type_id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true
      },
      document_id: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'documents', // The name of the referenced model
          key: 'document_id'
      }},
      document_type: {
        type: Sequelize.STRING,
        allowNull: false
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