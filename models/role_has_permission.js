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
    role_permission_id: {
      type: DataTypes.UUID,
      primaryKey:true
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'role_id'
      }},
    permission_id: {type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Permissions',
        key: 'permission_id'
    }},
    
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    is_deleted:DataTypes.BOOLEAN,
    deletionAt:DataTypes.DATE,
    deletedBy:DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Role_has_permissions',
  });
  return Role_has_permission;
};