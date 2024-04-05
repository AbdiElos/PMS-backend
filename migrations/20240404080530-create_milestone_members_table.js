'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Milestone_members', {
      milestone_member_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      milestone_id: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'Milestone', // The name of the referenced model
          key: 'milestone_id'
        }
      },
      project_member_id: {
        type: Sequelize.UUID,
        
        allowNull: false,
        references: {
          model: 'Project_member', // The name of the referenced model
          key: 'project_member_id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Milestone_members');
  }
};