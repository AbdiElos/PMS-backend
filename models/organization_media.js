const { user_role } = require("../config/db");

'use strict';
const {
  Model, UUIDV4, UUID
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization_Media extends Model {
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
  Organization_Media.init({
    organization_media_id: {
      type: DataTypes.UUID,
            primaryKey:true,
            allowNull:false
      },
    organization_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Organizations', // The name of the referenced model
        key: 'organization_id' // The name of the referenced column in the User table
      }
    },
    media_id: {
      type: DataTypes.UUID,
      references: {
        model: 'SocialMedias', // The name of the referenced model
        key: 'media_id' // The name of the referenced column in the Roles table
      }
    },
    URL:DataTypes.STRING,

    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    is_deleted:DataTypes.BOOLEAN,
    deletionAt:DataTypes.DATE,
    deletedBy:DataTypes.UUID
  }, {
    sequelize,
    modelName: 'OrganizationMedias',
  });
  return Organization_Media;
};