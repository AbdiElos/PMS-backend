'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Task_members', {
      task_member_id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true
      },
      milestone_member_id: {
        type: Sequelize.UUID
      },
      task_id: {
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
    await queryInterface.dropTable('Task_members');
  }
};