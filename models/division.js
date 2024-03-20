// models/division.js

module.exports = (sequelize, DataTypes) => {
    const Division = sequelize.define('Division', {
      division_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      sector_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      head_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
    Division.associate = (models) => {
      Division.hasMany(models.User, { foreignKey: 'division_id', as: 'User' });
    };
    
  
    return Division;
  };
  