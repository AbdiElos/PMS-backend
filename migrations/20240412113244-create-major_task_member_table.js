'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Major_task_members', {
      major_task_member_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
        //defaultValue: Sequelize.UUIDV4
      },
      Major_task_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Major_tasks',
          key: 'Major_task_id'
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
      major_task_status: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('Major_task_members');
  }
};
