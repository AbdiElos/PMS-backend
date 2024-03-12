module.exports = (sequelize, DataTypes) => {
    const Sector = sequelize.define('Sector', {
        sector_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
  
    // Sector.sync()
    //   .then(() => {
    //     // console.log('User table created or already exists');
    //   })
    //   .catch((error) => {
    //     console.error('Error creating Division table:', error);
    //   });
  
    return Sector;
  };