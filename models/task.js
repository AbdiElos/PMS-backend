'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsToMany(models.Milestone_member, {
        through: 'Task_member',
        foreignKey: 'task_id',
        otherKey: 'milestone_member_id',
        as: 'milestone_members',
      });
    }
  }
  Task.init({
    task_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    milestone_id:{
      type: DataTypes.UUID,
      allowNull:false,
      references: {
        model: 'milestones', // The name of the referenced model
        key: 'milestone_id' // The name of the referenced column in the Roles table
  }
  },
    name: DataTypes.STRING,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};