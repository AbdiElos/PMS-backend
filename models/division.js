// models/division.js

module.exports = (sequelize, DataTypes) => {
    const Division = sequelize.define('Divisions', {
      division_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      sector_id: {
        type: DataTypes.UUID,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      head_id: {
        type: DataTypes.UUID,
        allowNull: true
      },

    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    is_deleted:DataTypes.BOOLEAN,
    deletionAt:DataTypes.DATE,
    deletedBy:DataTypes.UUID
    });
    Division.associate = (models) => {
      Division.hasMany(models.User, { foreignKey: 'division_id', as: 'User' });
    };
    return Division;
  };
  