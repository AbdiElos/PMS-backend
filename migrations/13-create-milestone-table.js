'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Milestones', {
      milestone_id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true,
      },
      project_id: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'Projects', // The name of the referenced model
          key: 'project_id' // The name of the referenced column in the Roles table
      }},
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      milestone_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('Milestones');
  }
};