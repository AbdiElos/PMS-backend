module.exports = (sequelize, DataTypes) => {
    const Task_member = sequelize.define('Task_member', {
      task_member_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      milestone_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
       
      },
      task_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
       
      },

    });
  
    Task_member.sync()
      .then(() => {
        // console.log('Task table created or already exists');
      })
      .catch((error) => {
        console.error('Error creating Task_member table:', error);
      });
  
    return Task_member;
  };