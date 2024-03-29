'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sub_task = sequelize.define('Sub_task', {
    sub_task_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    task_member_id: {
        type: DataTypes.UUID,
        allowNull:false,
        references: {
          model: 'task_members', // The name of the referenced model
          key: 'task_member_id'
    }},
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
    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Sub_task;
};