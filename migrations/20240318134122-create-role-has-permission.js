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
        type: Sequelize.UUID
      },
      permission_id: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Role_has_permissions');
  }
};