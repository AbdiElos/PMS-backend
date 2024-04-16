'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      project_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      overall_progress: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      division_id:  {
        type: Sequelize.UUID,
        references: {
          model: 'Divisions', // The name of the referenced model
          key: 'division_id' // The name of the referenced column in the Roles table
        }
      },
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
    await queryInterface.dropTable('Projects');
  }
};