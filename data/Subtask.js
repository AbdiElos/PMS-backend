module.exports = (sequelize, DataTypes) => {
    const Subtask = sequelize.define('Subtask', {
      subtask_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      task_member_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
       
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtask_status: {
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
  
    Subtask.sync()
      .then(() => {
        // console.log('Subtask table created or already exists');
      })
      .catch((error) => {
        console.error('Error creating Subtask table:', error);
      });
  
    return Subtask;
  };