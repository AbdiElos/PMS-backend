module.exports = (sequelize, DataTypes) => {
    const Milestone = sequelize.define('Milestone', {
      milestone_id: {
        type: DataTypes.UUID,
        allowNull:false,
        primaryKey: true,
      },
     


      project_id: {
      
        type: DataTypes.UUID,
        allowNull:false,
      
        references: {
          model: 'Project', // The name of the referenced model
          key: 'project_id' // The name of the referenced column in the project table table
      }
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
  
    
  
    return Milestone;
  };