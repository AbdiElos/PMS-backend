'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Divisions', {
      division_id: {type: Sequelize.UUID,primaryKey: true,allowNull: false},
      sector_id: {type: Sequelize.UUID,defaultValue: Sequelize.UUIDV4,allowNull: true},
      name: {type: Sequelize.STRING,allowNull: false},
      head_id: {type: Sequelize.UUID,defaultValue: Sequelize.UUIDV4,allowNull: true},
      created_by: {type: Sequelize.UUID},
      updated_by: {type: Sequelize.UUID},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE},
      is_deleted: {allowNull: false,type: Sequelize.BOOLEAN,default:false},
      deletionAt:{allowNull:true,type:Sequelize.DATE},
      deletedBy:{allowNull:true,type:Sequelize.UUID}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Divisions');
  }
};
