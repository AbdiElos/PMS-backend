'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Document_type = sequelize.define('Document_type', {
    document_type_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    document_type: {
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

  return Document_type;
};