module.exports = (sequelize, DataTypes) => {
    const Project_member = sequelize.define('Project_member', {
      project_member_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
      },
      project_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
      },
 
    
    });
  
    Project_member.sync()
      .then(() => {
        // console.log('Members table created or already exists');
      })
      .catch((error) => {
        console.error('Error creating Project_member table:', error);
      });
  
    return Project_member;
  };