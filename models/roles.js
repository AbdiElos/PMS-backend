'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   Roles.belongsToMany(models.User, {
    //     through: 'User_role',
    //     foreignKey: 'role_id',
    //     otherKey: 'user_id'
    //   });
    // }
    
  }
  Roles.init({
    role_id:{type:DataTypes.UUID,primaryKey:true,required: true},
    name: DataTypes.STRING,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};