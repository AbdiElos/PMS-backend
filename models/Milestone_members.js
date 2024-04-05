module.exports = (sequelize, DataTypes) => {
    const Milestone_members = sequelize.define('Milestone_members', {
      milestone_member_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      milestone_id: {
        type: DataTypes.UUID,
        allowNull:false,
        references: {
          model: 'Milestone', // The name of the referenced model
          key: 'milestone_id'
        }
      },
      project_member_id: {
        type: DataTypes.UUID,
        
        allowNull: false,
        references: {
          model: 'Project_member', // The name of the referenced model
          key: 'project_member_id'
        }
      },
    });
  
    return Milestone_members;
  };