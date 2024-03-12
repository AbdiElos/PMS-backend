module.exports = (sequelize, DataTypes) => {
    const Document_type = sequelize.define('Document_type', {
     document_type_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      document_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true
      },
     
      document_type: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    // Document_type.sync()
    //   .then(() => {
    //     // console.log('Document_type table created or already exists');
    //   })
    //   .catch((error) => {
    //     console.error('Error creating Document_typetable:', error);
    //   });
  
    return Document_type;
  };