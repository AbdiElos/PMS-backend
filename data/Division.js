module.exports = (sequelize, DataTypes) => {
    const Division = sequelize.define('Division', {
     division_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
  
    Division.sync()
      .then(() => {
        // console.log('User table created or already exists');
      })
      .catch((error) => {
        console.error('Error creating Division table:', error);
      });
  
    return Division;
  };