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
    name: DataTypes.STRING,
    project_manager: DataTypes.STRING,
    technical_manager: DataTypes.STRING,
    overall_progress: DataTypes.STRING,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    document_id: DataTypes.UUID,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};