'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Major_task extends Model {
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
  Major_task.init({
    major_task_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    activity_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Activities', // The corrected name of the referenced model
        key: 'activity_id'
      }
    },
  // mejor_task_status: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
    name: DataTypes.STRING,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
    is_deleted: {allowNull: false,type: DataTypes.BOOLEAN,default:false},
    // major_task_status: {
    //     type: DataTypes.STRING,
       
    //   },
  }, {
    sequelize,
    modelName: 'Major_task',
  });
  return Major_task;
};