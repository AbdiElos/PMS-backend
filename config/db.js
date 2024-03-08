const Sequelize = require('sequelize');
const connection = require('./connect');

const sequelize = new Sequelize(
  connection.config.database,
  connection.config.user,
  connection.config.password,
  {
    host: connection.config.host,
    port: connection.config.port,
    dialect: 'mysql', // Assuming you want to use MySQL
    operatorsAliases: false,
    pool: {
      max: 10, // Adjust as per your requirement
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import your models here
db.Roles = require('../data/Roles')(sequelize, Sequelize);
db.User = require('../data/User')(sequelize, Sequelize);
db.Activity = require('../data/Activity')(sequelize, Sequelize);

// Define associations if any
//db.Roles.hasMany(db.User, { as: 'User' });
//db.User.belongsTo(db.Roles, { foreignKey: 'Role_id', as: 'role' });

module.exports = db;
