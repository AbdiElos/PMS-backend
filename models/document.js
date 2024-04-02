'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Document = sequelize.define('Document', {
    document_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    document_type_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'document_types', // The name of the referenced model
        key: 'document_type_id'
      }
    },
    project_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'projects', // The name of the referenced model
        key: 'project_id'
      }
    },
    task_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Task', // The name of the referenced model
        key: 'task_id'
      }
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdBy:{
      type:DataTypes.UUID
    },
    updatedBy:{
      type:DataTypes.UUID
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  });

  return Document;
};