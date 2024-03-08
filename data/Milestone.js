module.exports = (sequelize, DataTypes) => {
    const Milestone = sequelize.define('Milestone', {
      milestone_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      project_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
       
      },
      
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      milestone_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      technical_manager: {
        type: DataTypes.STRING,
        allowNull: true,
      },
     
      start_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.STRING,
        allowNull: true,
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
  
    Milestone.sync()
      .then(() => {
        // console.log('User table created or already exists');
      })
      .catch((error) => {
        console.error('Error creating Project table:', error);
      });
  
    return Milestone;
  };