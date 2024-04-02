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
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    createdBy: DataTypes.UUID,
    updatedBy: DataTypes.UUID,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};