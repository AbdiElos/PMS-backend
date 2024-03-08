module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    // role_id: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   primaryKey: true,
      
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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

  Roles.sync({ alter: false })
    .then(() => {
      // console.log('Roles table created or already exists');
      //return Roles.create({ name: 'user' });
    })
    .catch((error) => {
      console.error('Error creating Roles table:', error);
    });

  return Roles;
};