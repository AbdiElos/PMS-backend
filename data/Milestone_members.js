module.exports = (sequelize, DataTypes) => {
    const Milestone_members = sequelize.define('Milestone_members', {
        milestone_memeber_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      milestone_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
       
      },
      member_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
       
      },  
   
    });
  
    // Milestone_members.sync()
    //   .then(() => {
    //     // console.log('Milestone_member table created or already exists');
    //   })
    //   .catch((error) => {
    //     console.error('Error creating Milestone_memeber table:', error);
    //   });
  
    return Milestone_members;
  };