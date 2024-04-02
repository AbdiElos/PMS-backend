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

  return Document_type;
};