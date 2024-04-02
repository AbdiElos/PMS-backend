'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      user_id: {
        type: Sequelize.UUID,
        primaryKey:true
      },
      full_name: {
        type: Sequelize.STRING
      },
      first_time_status:{
        type:Sequelize.BOOLEAN
      },
      img_url: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      unchanged_password: {
        type: Sequelize.STRING
      },
      division_id:  {
        type: Sequelize.UUID,
        references: {
          model: 'Divisions', // The name of the referenced model
          key: 'division_id' // The name of the referenced column in the Roles table
        }
      },
      refreshToken: {
        type: Sequelize.STRING
      },
      team_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Teams', // The name of the referenced model
          key: 'team_id' // The name of the referenced column in the Roles table
        }
      },
      project_status: {
        type: Sequelize.BOOLEAN
      },
      account_status: {
        type: Sequelize.BOOLEAN
      },
      created_by: {
        type: Sequelize.UUID
      },
      updated_by: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      is_deleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        default:false
      },
      deletionAt:{
        allowNull:true,
        type:Sequelize.DATE
      },
      deletedBy:{
        allowNull:true,
        type:Sequelize.UUID
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};