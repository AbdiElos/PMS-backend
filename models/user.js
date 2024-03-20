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
    img_url: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    password: DataTypes.STRING,
    division_id: DataTypes.UUID,
    refreshToken: DataTypes.STRING,
    team_id: DataTypes.UUID,
    project_status:{type:DataTypes.BOOLEAN,defaultValue:false},
    account_status: {type:DataTypes.BOOLEAN,defaultValue:true},
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = (models) => {
    User.belongsTo(models.Division, { foreignKey: 'division_id', as: 'Division' });
  };

  
  return User;
};