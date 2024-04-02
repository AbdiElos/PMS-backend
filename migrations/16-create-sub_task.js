'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sub_tasks', {
      sub_task_id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
    //   task_member_id: {
    //     type: Sequelize.UUID,
    //     allowNull:false,
    //     references: {
    //       model: 'task_members', // The name of the referenced model
    //       key: 'task_member_id'
    // }},
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subtask_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      end_date: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('Sub_tasks');
  }
};