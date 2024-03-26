'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Documents', {
      document_id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true
      },
      document_type_id: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'document_types', // The name of the referenced model
          key: 'document_type_id'
      }},
      project_id: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'projects', // The name of the referenced model
          key: 'project_id'
      }},
      document: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Documents');
  },
};