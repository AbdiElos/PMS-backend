module.exports = (sequelize, DataTypes) => {
  const Activity_members = sequelize.define('Activity_members', {
    activity_member_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    activity_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Activities', // The corrected name of the referenced model
        key: 'activity_id'
      }
    },
    project_member_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Project_members', // The name of the referenced model
        key: 'project_member_id'
      }
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

  return Activity_members;
};
