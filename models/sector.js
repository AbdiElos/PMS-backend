module.exports = (sequelize, DataTypes) => {
  const Sector = sequelize.define('Sector', {
    sector_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    leader_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    is_deleted:DataTypes.BOOLEAN,
    deletionAt:DataTypes.DATE,
    deletedBy:DataTypes.UUID
  });

  return Sector;
};
