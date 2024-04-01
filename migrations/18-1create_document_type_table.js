'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Document_types', {
      document_type_id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true
      },
      document_type: {
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
    await queryInterface.dropTable('Document_types');
  }
};