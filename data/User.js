const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../config/connect');

const sequelize = new Sequelize(
  connection.config.database,
  connection.config.user,
  connection.config.password,
  {
    host: connection.config.host,
    port: connection.config.port,
    dialect: 'mysql',
  }
);

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roles: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user', // Set the default value to 'user'
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

User.sync({ alter: false })
  .then(() => {
    //console.log('User table created or already exists');
  })
  .catch((error) => {
    console.error('Error creating User table:', error);
  });

module.exports = User;