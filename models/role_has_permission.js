'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role_has_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role_has_permission.init({
    role_id: {type:DataTypes.UUID,
        references: {
          model: 'Roles', // The name of the referenced model
          key: 'role_id' // The name of the referenced column in the Roles table
        }},
    permission_id:{type:DataTypes.UUID,
      references: {
        model: 'Permission', // The name of the referenced model
        key: 'permission_id' // The name of the referenced column in the Roles table
      }},
  }, {
    sequelize,
    modelName: 'Role_has_permission',
  });
  return Role_has_permission;
};

// User_role.init({
//   user_id: {
//     type: DataTypes.UUID,
//      // Ensures the user_id cannot be null
//     references: {
//       model: 'User', // The name of the referenced model
//       key: 'user_id' // The name of the referenced column in the User table
//     }
//   },
//   role_id: {
//     type: DataTypes.UUID,
    
//     references: {
//       model: 'Roles', // The name of the referenced model
//       key: 'role_id' // The name of the referenced column in the Roles table
//     }
//   }
// }, {
//   sequelize,
//   modelName: 'User_role',
// });
