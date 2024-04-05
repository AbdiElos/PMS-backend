'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project_member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project_member.init({
    project_member_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      
      type: DataTypes.UUID,
      allowNull:false,
    
      references: {
        model: 'Project', // The name of the referenced model
        key: 'project_id' // The name of the referenced column in the project table table
    }
    },
    
    project_id:{
      
      type: DataTypes.UUID,
      allowNull:false,
    
      references: {
        model: 'Project', // The name of the referenced model
        key: 'project_id' // The name of the referenced column in the project table table
    }
    },
    

    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    is_deleted:DataTypes.BOOLEAN,
    deletionAt:DataTypes.DATE,
    deletedBy:DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Project_members',
  });
  return Project_member;
};