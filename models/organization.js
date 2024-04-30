'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Organization = sequelize.define('Organizations', {
    organization_id: {type: DataTypes.UUID,primaryKey: true,allowNull: false},
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    acronym:DataTypes.STRING,
    background:DataTypes.STRING,
    header_color:DataTypes.STRING,
    footer_color:DataTypes.STRING,
    background_color:DataTypes.STRING,
    copyright_text:DataTypes.STRING,

    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    is_deleted:DataTypes.BOOLEAN,
    deletionAt:DataTypes.DATE,
    deletedBy:DataTypes.UUID
  });

  return Organization;
};