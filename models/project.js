'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init({
    project_id: {type:DataTypes.UUID,primaryKey:true,required: true},
    name: {type:DataTypes.STRING,required:false},
    project_manager: DataTypes.UUID,
    technical_manager: DataTypes.UUID,
    overall_progress: DataTypes.STRING,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    document_id: DataTypes.UUID,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    is_deleted:DataTypes.BOOLEAN,
    deletionAt:DataTypes.DATE,
    deletedBy:DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Projects',
  });
  return Project;
};