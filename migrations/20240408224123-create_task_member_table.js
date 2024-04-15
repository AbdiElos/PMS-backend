'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Task_members', {
      task_member_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      project_member_id: {
        type: Sequelize.UUID,
        
        allowNull: false,
        references: {
          model: 'Project_members', // The name of the referenced model
          key: 'project_member_id'
        }
      },
    
      task_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Tasks',
          key: 'task_id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Task_members');
  }
};