const Sequelize = require('sequelize');
const connection = require('./connect');

const sequelize = new Sequelize(
  connection.config.database,
  connection.config.user,
  connection.config.password,
  {
    host: connection.config.host,
    port: connection.config.port,
    dialect: 'mysql', 
    operatorsAliases: false,
    pool: {
      max: 10, 
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import  models here
db.Roles = require('../data/Roles')(sequelize, Sequelize);
db.User = require('../data/User')(sequelize, Sequelize);
db.Activity = require('../data/Activity')(sequelize, Sequelize);
db.Permission = require('../data/Permissions')(sequelize, Sequelize);
db.Role_has_permission = require('../data/role_has_permission')(sequelize, Sequelize);
db.Division= require('../data/Division')(sequelize, Sequelize);
db.Team= require('../data/Team')(sequelize, Sequelize);
db.Sector= require('../data/Sector')(sequelize, Sequelize);
db.Project= require('../data/Project')(sequelize, Sequelize);
db.Project_member= require('../data/Project_member')(sequelize, Sequelize);
db.Milestone= require('../data/Milestone')(sequelize, Sequelize);
db.Task= require('../data/Task')(sequelize, Sequelize);
db.Subtask= require('../data/Subtask')(sequelize, Sequelize);
db.Comment= require('../data/Comment')(sequelize, Sequelize);
db.Task_member= require('../data/Task_member')(sequelize, Sequelize);
db.Document= require('../data/Document')(sequelize, Sequelize);
db.Document_type= require('../data/Document_type')(sequelize, Sequelize);
db.Milestone_members= require('../data/Milestone_members')(sequelize, Sequelize);

// Define associations if any+

db.Roles.hasMany(db.User, { foreignKey: "role_id", as: 'User' });
db.User.belongsTo(db.Roles, { foreignKey: "role_id", as: 'Roles' });


// Define many-to-One relationship between Sector and Division
db.Sector.hasMany(db.Division, { foreignKey: "sector_id", as: 'Division' });
db.Division.belongsTo(db.Sector, { foreignKey: "sector_id", as: 'Sector' });


// Define many-to-One relationship between Team and User
db.Team.hasMany(db.User, { foreignKey: "team_id", as: 'User' });
db.User.belongsTo(db.Team, { foreignKey: "team_id", as: 'Team' });

// Define many-to-One relationship between Division and User
db.Division.hasMany(db.User, { foreignKey: "division_id", as: 'User' });
db.User.belongsTo(db.Division, { foreignKey: "division_id", as: 'Division' });


// Define many-to-One relationship between Project and Document
db.Project.hasMany(db.Document, { foreignKey: "project_id", as: 'Document' });
db.Document.belongsTo(db.Project, { foreignKey: "project_id", as: 'Project' });

// Define many-to-One relationship between Document_type  and Document
db.Document_type.hasMany(db.Document, { foreignKey: "document_type_id", as: 'Document' });
db.Document.belongsTo(db.Document_type, { foreignKey: "document_type_id", as: 'Document_type' });


// Define many-to-One relationship between Milestone  and Task
db.Milestone.hasMany(db.Task, { foreignKey: "milestone_id", as: 'Task' });
db.Task.belongsTo(db.Milestone, { foreignKey: "milestone_id", as: 'Milestone' });
// Define many-to many relationship between 




// Define many-to-many relationship between User and Project
db.User.belongsToMany(db.Project, {
  through: 'Project_member',
  foreignKey: 'user_id',
   otherKey: 'project_id',
   as: 'Project',
 });

 db.Project.belongsToMany(db.User, {
  through: 'Project_member',
 foreignKey: 'Project_id',
  otherKey: 'user_id',
  as: 'User',
 });



// Define many-to-many relationship between Roles and Permissions
 db.Roles.belongsToMany(db.Permission, {
  through: 'Role_has_permission',
  foreignKey: 'role_id',
   otherKey: 'permission_id',
   as: 'Permissions',
 });

 db.Permission.belongsToMany(db.Roles, {
  through: 'Role_has_permission',
 foreignKey: 'permission_id',
  otherKey: 'role_id',
  as: 'Roles',
 });
module.exports = db;
