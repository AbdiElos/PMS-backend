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
      // Task.belongsToMany(models.Milestone_member, {
      //   through: 'Task_member',
      //   foreignKey: 'task_id',
      //   otherKey: 'milestone_member_id',
      //   as: 'milestone_members',
      // });
    }
  }
  Task.init({
    task_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    Major_task_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Major_tasks',
        key: 'Major_task_id'
      }
    },
    is_milestone: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    updatedAt: {allowNull: false,type: DataTypes.DATE},
    is_deleted: {allowNull: false,type: DataTypes.BOOLEAN,defaultValue:false},
    deletionAt:{allowNull:true,type:DataTypes.DATE},
    deletedBy:{allowNull:true,type:DataTypes.UUID},
    name: DataTypes.STRING,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID

  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};