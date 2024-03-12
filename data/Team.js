module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
        team_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    team_manager_id: {
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
  
    // Team.sync()
    //   .then(() => {
    //     // console.log('Team table created or already exists');
    //   })
    //   .catch((error) => {
    //     console.error('Error creating Team table:', error);
    //   });
  
    return Team;
  };