const { user_role } = require("../config/db");

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   

    // static associate(models) {
    //   User.belongsToMany(models.roles, {
    //     through: 'User_role',
    //     foreignKey: 'user_id',
    //     otherKey: 'role_id'
    //   });
    // }
    
  }
  User_role.init({
    user_id: {
      type: DataTypes.UUID,
       // Ensures the user_id cannot be null
      references: {
        model: 'User', // The name of the referenced model
        key: 'user_id' // The name of the referenced column in the User table
      }
    },
    project_id:{
      type: DataTypes.UUID,
       // Ensures the user_id cannot be null
      references: {
        model: 'Project', // The name of the referenced model
        key: 'project_id' // The name of the referenced column in the project table
      }
    },
    role_id: {
      type: DataTypes.UUID,
      
      references: {
        model: 'Roles', // The name of the referenced model
        key: 'role_id' // The name of the referenced column in the Roles table
      }
    }
  }, {
    sequelize,
    modelName: 'User_role',
  });
  
  return User_role;
};