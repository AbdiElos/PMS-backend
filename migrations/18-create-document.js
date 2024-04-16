'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Documents', {
      document_id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true
      },
      document_type_id: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'Document_types', // The name of the referenced model
          key: 'document_type_id'
      }},
      project_id: {
        type: Sequelize.UUID,
        allowNull:true,
        references: {
          model: 'Projects', // The name of the referenced model
          key: 'project_id'
      }},
      document: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
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
    await queryInterface.dropTable('Documents');
  },
};