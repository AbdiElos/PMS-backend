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
        allowNull:true,
        references: {
          model: 'Projects', // The name of the referenced model
          key: 'project_id'
      }},
      task_id:{
        type: Sequelize.UUID,
        allowNull:true,
        references: {
          model: 'Tasks', // The name of the referenced model
          key: 'task_id'
      }},
      document: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdBy:{
        type:Sequelize.UUID,
      },
      updatedBy:{
        type:Sequelize.UUID,
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