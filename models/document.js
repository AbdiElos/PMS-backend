'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Document = sequelize.define('Document', {
    document_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    // document_type_id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: {
    //     model: 'document_types', // The name of the referenced model
    //     key: 'document_type_id'
    //   }
    // },
    project_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'projects', // The name of the referenced model
        key: 'project_id'
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

  return Document;
};