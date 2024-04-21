'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      comment_id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true
      },
      sub_task_id:  {
        type: Sequelize.UUID,
        allowNull:true,
        references: {
          model: 'sub_tasks', // The name of the referenced model
          key: 'sub_task_id'
      }},
      project_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'projects',
          key: 'project_id'
        }
      },
      activity_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'activities',
          key: 'activity_id'
        }
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_by: {type: Sequelize.UUID},
      updated_by: {type: Sequelize.UUID},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE},
      is_deleted: {allowNull: false,type: Sequelize.BOOLEAN,default:false},
      deletionAt:{allowNull:true,type:Sequelize.DATE},
      deletedBy:{allowNull:true,type:Sequelize.UUID}
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};