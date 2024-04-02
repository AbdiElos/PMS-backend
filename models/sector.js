module.exports = (sequelize, DataTypes) => {
  const Sector = sequelize.define('Sector', {
    sector_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    leader_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
  return Sector;
};
