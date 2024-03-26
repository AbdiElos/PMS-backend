'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Document_type = sequelize.define('Document_type', {
    document_type_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    document_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'documents', // The name of the referenced model
        key: 'document_id'
      }
    },
    document_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  });

  return Document_type;
};