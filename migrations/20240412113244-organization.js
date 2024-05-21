'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Organizations', {
      organization_id: {type: Sequelize.UUID,primaryKey: true,allowNull: false},
      name: {type: Sequelize.STRING,allowNull: true},
      logo: {type: Sequelize.STRING,allowNull: true},
      acronym:{type: Sequelize.STRING,allowNull: true},
      background:{type: Sequelize.STRING,allowNull: true},
      header_color:{type: Sequelize.STRING,allowNull: true},
      footer_color:{type: Sequelize.STRING,allowNull: true},
      background_color:{type: Sequelize.STRING,allowNull: true},
      copyright_text:{type: Sequelize.STRING,allowNull: true},
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
    await queryInterface.dropTable('Organizations');
  }
};
