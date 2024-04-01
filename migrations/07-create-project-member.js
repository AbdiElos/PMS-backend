'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Project_members', {
      project_member_id: {allowNull: false,primaryKey: true,type: Sequelize.UUID},
      project_id: {type: Sequelize.UUID},
      user_id: {type: Sequelize.UUID},
      created_by: {type: Sequelize.UUID},
      updated_by: {type: Sequelize.UUID},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE},
      is_deleted: {allowNull: false,type: Sequelize.BOOLEAN,default:false},
      deletionAt:{allowNull:true,type:Sequelize.DATE},
      deletedBy:{allowNull:true,type:Sequelize.UUID}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Project_members');
  }
};