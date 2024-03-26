'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Milestone_members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Milestone_members.init({
    milestone_member_id: {
      type: DataTypes.UUID,
      allowNull:false,
      primaryKey: true,
    },
    milestone_id: DataTypes.UUID,
    project_member_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Milestone_members',
  });
  return Milestone_members;
};