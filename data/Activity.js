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

const Activity = sequelize.define('Activity', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

Activity.sync()
  .then(() => {
   // console.log('Activity table created or already exists');
  })
  .catch((error) => {
    console.error('Error creating Activity table:', error);
  });

module.exports = Activity;