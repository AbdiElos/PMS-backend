'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task_member = sequelize.define('Task_member', {
    task_member_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    milestone_member_id: {
      type: DataTypes.UUID,
      //allowNull: false,
      references: {
        model: 'Milestone_members', // The name of the referenced model
        key: 'milestone_member_id'
      }
    },
    task_id:{
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Tasks', // The name of the referenced model
        key: 'task_id'
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
  return Task_member;
};
