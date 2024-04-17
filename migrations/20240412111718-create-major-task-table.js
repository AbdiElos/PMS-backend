'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Major_tasks', {
      Major_task_id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      milestone_id:{
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'milestones', // The name of the referenced model
          key: 'milestone_id' // The name of the referenced column in the Roles table
    }},
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // mejor_task_status: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
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
    await queryInterface.dropTable('Major_tasks');
  }
};