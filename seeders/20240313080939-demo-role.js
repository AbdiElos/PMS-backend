'use strict';

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [{
      role_id: uuidv4(),
      name: 'Admin',
      created_by: 'Admin',
      updated_by: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      role_id: uuidv4(),
      name: 'User',
      created_by: 'Admin',
      updated_by: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
