'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Milestone_members', {
      milestone_member_id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true,
      },
      milestone_memeber_id: {
        type: Sequelize.UUID
      },
      milestone_id: {
        type: Sequelize.UUID
      },
      project_member_id: {
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
    await queryInterface.dropTable('Milestone_members');
  }
};