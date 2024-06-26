'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrganizationMedias', {
      organization_media_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      organization_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Organizations',
          key: 'organization_id'
        }
      },
      media_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'SocialMedias',
          key: 'media_id'
        }
      },
      url: {type: Sequelize.STRING,allowNull: false},
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
    await queryInterface.dropTable('OrganizationMedias');
  }
};