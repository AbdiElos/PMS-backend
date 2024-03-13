'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Permissions',"permission_id");
    await queryInterface.addColumn('Permissions', "permission_id",{
        type: Sequelize.DataTypes.UUID,
        // required: true,
        allowNull:false,
        primaryKey:true
      });
  },
  async down(queryInterface, Sequelize) {
   await queryInterface.removeColumn('Permissions',"permission_id");
  }
};