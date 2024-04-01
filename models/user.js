'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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
  User.init({
    user_id: { type: DataTypes.UUID, primaryKey: true, required:true }, // Specify user_id as the primary key
    full_name: DataTypes.STRING,
    first_time_status:DataTypes.BOOLEAN,
    img_url: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: {type:DataTypes.STRING,allowNull:false},
    password: DataTypes.STRING,
    unchanged_password: DataTypes.STRING,
    division_id:  {
      type: DataTypes.UUID,
      references: {
        model: 'Divisions', // The name of the referenced model
        key: 'division_id' // The name of the referenced column in the Roles table
      }
    },
    refreshToken: DataTypes.STRING,
    team_id: DataTypes.UUID,
    project_status:{type:DataTypes.BOOLEAN,defaultValue:false},
    account_status: {type:DataTypes.BOOLEAN,defaultValue:true},
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    is_deleted:DataTypes.BOOLEAN,
    deletionAt:DataTypes.DATE,
    deletedBy:DataTypes.UUID
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};