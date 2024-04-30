'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SocialMedias', {
      media_id: {type: Sequelize.UUID,primaryKey: true,allowNull: false},
      name: {type: Sequelize.STRING,allowNull: true},
      logo: {type: Sequelize.STRING,allowNull: true},
      general_url:{type: Sequelize.STRING,allowNull: true},
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
    await queryInterface.dropTable('SocialMedias');
  }
};
