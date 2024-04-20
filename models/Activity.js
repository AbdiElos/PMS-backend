module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    activity_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    project_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Project', // The name of the referenced model
        key: 'project_id' // The name of the referenced column in the Project table
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    activity_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    is_deleted: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    deletedBy: {
      allowNull: true,
      type: DataTypes.UUID,
    }
  });

  return Activity;
};
