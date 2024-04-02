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