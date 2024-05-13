'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Comment = sequelize.define('Comment', {
    comment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    sub_task_id:  {
      type: DataTypes.UUID,
      allowNull:true,
      references: {
        model: 'sub_tasks', // The name of the referenced model
        key: 'sub_task_id'
    }},
    project_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'projects',
        key: 'project_id'
      }
    },
    activity_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'activities',
        key: 'activity_id'
      }
    },
    
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    is_deleted:DataTypes.BOOLEAN,
    deletionAt:DataTypes.DATE,
    deletedBy:DataTypes.UUID
  });

  return Comment;
};