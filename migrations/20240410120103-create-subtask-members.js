'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subtask_members', {
      subtask_member_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
        //defaultValue: Sequelize.UUIDV4
      },
      subtask_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Sub_tasks',
          key: 'sub_task_id'
        }
      },
      project_member_id: {
        type: Sequelize.UUID,
        
        allowNull: false,
        references: {
          model: 'Project_members', // The name of the referenced model
          key: 'project_member_id'
        }
      },
      created_by: Sequelize.UUID,
      updated_by: Sequelize.UUID,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      is_deleted: Sequelize.BOOLEAN,
      deletionAt: Sequelize.DATE,
      deletedBy: Sequelize.UUID
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Subtask_members');
  }
};
