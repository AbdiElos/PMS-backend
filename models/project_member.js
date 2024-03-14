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
    //project_member_id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    project_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Project_member',
  });
  return Project_member;
};