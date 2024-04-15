'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Major_task_member extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  Major_task_member.init({
    major_task_member_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      //defaultValue: DataTypes.UUIDV4,
    },
    Major_task_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Major_tasks',
        key: 'Major_task_id'
      }
    },
    project_member_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Project_members',
        key: 'project_member_id'
      }
    },
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    is_deleted: DataTypes.BOOLEAN,
    deletionAt: DataTypes.DATE,
    deletedBy: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Major_task_member',
  });

  return Major_task_member;
};
