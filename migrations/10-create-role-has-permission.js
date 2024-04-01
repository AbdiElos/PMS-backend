'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Role_has_permissions', {
      role_permission_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
       },
       role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'role_id'
        }},
      permission_id: {type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Permissions',
          key: 'permission_id'
      }},
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
    await queryInterface.dropTable('Role_has_permissions');
  }
};