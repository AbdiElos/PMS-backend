module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
      project_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      project_manager: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      technical_manager: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      overall_progress: {
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
     
      document_id: {
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
  
    Project.sync()
      .then(() => {
        // console.log('User table created or already exists');
      })
      .catch((error) => {
        console.error('Error creating Project table:', error);
      });
  
    return Project;
  };