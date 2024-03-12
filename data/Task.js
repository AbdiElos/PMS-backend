module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      task_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      milestone_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
       
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
  
    // Task.sync()
    //   .then(() => {
    //     // console.log('Task table created or already exists');
    //   })
    //   .catch((error) => {
    //     console.error('Error creating Task table:', error);
    //   });
  
    return Task;
  };