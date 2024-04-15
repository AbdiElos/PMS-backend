'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sub_task = sequelize.define('Sub_task', {
    sub_task_id: {
      type: DataTypes.UUID,
      allowNull:false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    task_id:{
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Tasks', // The name of the referenced model
        key: 'task_id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtask_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    is_deleted:DataTypes.BOOLEAN,
    deletionAt:DataTypes.DATE,
    deletedBy:DataTypes.UUID
  });

  return Sub_task;
};