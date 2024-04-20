'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Activity_members', {
      activity_member_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      activity_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Activities', // The corrected name of the referenced model
          key: 'activity_id'
        }
      },
      project_member_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Project_members', // The name of the referenced model
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
      is_deleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deletedBy: {
        allowNull: true,
        type: Sequelize.UUID,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Activity_members');
  }
};
