module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
        permission_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
  
  
    });
  
    Permission.sync({ alter: false })
      .then(() => {
        // console.log('Roles table created or already exists');
        //return Roles.create({ name: 'user' });
      })
      .catch((error) => {
        console.error('Error creating Permission table:', error);
      });
  
    return Permission;
  };