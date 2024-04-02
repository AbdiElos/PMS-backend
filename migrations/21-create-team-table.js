'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Teams', {
      team_id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      team_manager_id: {
        type: Sequelize.UUID,
        allowNull: true
      },
      division_id:{type:Sequelize.UUID},
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
    await queryInterface.dropTable('Teams');
  }
};