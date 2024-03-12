module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define('Document', {
     document_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      document_type_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true
      },
      project_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true
      },
      document: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
  
    // Document.sync()
    //   .then(() => {
    //     // console.log('Document table created or already exists');
    //   })
    //   .catch((error) => {
    //     console.error('Error creating Document table:', error);
    //   });
  
    return Document;
  };