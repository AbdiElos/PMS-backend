module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // full_name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: { // New column to be added
      type: DataTypes.STRING, // Assuming string data type for gender
      allowNull: true, // Adjust based on your requirements
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    created_us: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    division_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    team_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
    },
    // role_id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
    project_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    account_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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

  // User.sync()
  //   .then(() => {
  //     // console.log('User table created or already exists');
  //   })
  //   .catch((error) => {
  //     console.error('Error creating User table:', error);
  //   });

  return User;
};