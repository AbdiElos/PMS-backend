'use strict';
// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subtask_members', {
      subtask_member_id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true,
      },
      subtask_id: {
        type: Sequelize.UUID,
        allowNull:true,
        references: {
          model: 'Sub_tasks',
          key: 'sub_task_id'
        }},
      project_member_id: {
        type: Sequelize.UUID,
        allowNull:false,
        references:{
          model:'Project_members',
          key:'project_member_id'
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
    await queryInterface.dropTable('Subtask_members');
  }
};