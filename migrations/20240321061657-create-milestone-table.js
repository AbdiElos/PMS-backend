'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Milestones', {
      milestone_id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true,
      },
      


        project_id: {
          type: Sequelize.UUID,
          allowNull:false,
          references: {
            model: 'Project', // The name of the referenced model
            key: 'project_id' // The name of the referenced column in the Roles table
        }
        },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      milestone_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      technical_manager: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      start_date: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      end_date: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.STRING,
        allowNull: true,
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Milestones');
  }
};