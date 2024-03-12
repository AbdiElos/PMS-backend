module.exports = (sequelize, DataTypes) => {
    const Role_has_permission = sequelize.define('Role_has_permission', {
      role_has_permission_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      permission_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
  
  
    });
  
    // Role_has_permission.sync({ alter: false })
    //   .then(() => {
    //     // console.log('Roles table created or already exists');
    //     //return Roles.create({ name: 'user' });
    //   })
    //   .catch((error) => {
    //     console.error('Error creating Role_permission table:', error);
    //   });
  
    return Role_has_permission;
  };