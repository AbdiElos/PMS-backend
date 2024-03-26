'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task_member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task_member.init({
    task_member_id: {
      type: DataTypes.UUID,
      allowNull:false,
      primaryKey: true
    },
    milestone_member_id: DataTypes.UUID,
    task_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Task_member',
  });
  return Task_member;
};