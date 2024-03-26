'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      comment_id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true
      },
      task_id:  {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'tasks', // The name of the referenced model
          key: 'task_id'
      }},
      comment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: true
      },
      updated_by: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('Comments');
  }
};